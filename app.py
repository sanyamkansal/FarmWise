from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import requests
import base64
import pandas as pd
import os
import json
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv(override=True)
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
WEATHER_API_KEY = os.getenv('WEATHER_API_KEY')

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("models/gemini-2.5-flash")

languages = {
    "ml": "Malayalam",
    "hi": "Hindi", 
    "ta": "Tamil",
    "kn": "Kannada",
    "en": "English"
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    question = data.get("query", "").strip()
    language = data.get("language", "en")
    
    if not question:
        return jsonify({"error": "Please ask a question!"})
    
    lang_name = languages.get(language, "English")
    
    # Prompts
    prompt = f"""You are an experienced agricultural extension officer and plant pathologist helping Indian farmers.

Language: Respond in {lang_name} using simple, farmer-friendly language.

Context: You are helping farmers in India with their agricultural queries. Consider:
- Local climate conditions and seasonal factors in India
- Common crops grown in India (rice, wheat, cotton, sugarcane, vegetables, etc.)
- Organic and sustainable farming practices
- Cost-effective solutions for small and medium farmers
- Regional farming practices across different states

Farmer's Question: {question}

Provide practical, actionable advice that includes:
1. Immediate actions to take
2. Prevention methods for future
3. Cost-effective solutions available in India
4. When to seek additional help from local agricultural officers

Keep the response concise but comprehensive, and always prioritize farmer safety and crop health."""

    try:
        response = model.generate_content(prompt)
        return jsonify({
            "answer": response.text.strip(),
            "language": language 
        })
    except Exception as e:
        return jsonify({"error": f"AI service error: {str(e)}"})

@app.route("/identify", methods=["POST"])
def identify_plant():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"})
    
    image_file = request.files['image']
    
    if image_file.filename == '':
        return jsonify({"error": "Please select an image"})
    
    language = request.form.get('language', 'en')
    lang_name = languages.get(language, "English")
    
    # File Size
    image_file.seek(0, 2)
    file_size = image_file.tell()
    if file_size > 5 * 1024 * 1024:
        return jsonify({"error": "File too large. Maximum size is 5MB"})
    
    # File type
    allowed_types = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'}
    file_ext = image_file.filename.rsplit('.', 1)[1].lower() if '.' in image_file.filename else ''
    if file_ext not in allowed_types:
        return jsonify({"error": "Invalid file type. Please upload PNG, JPG, JPEG, GIF, BMP, or WebP images"})
    
    try:
        # base64
        image_file.seek(0)
        image_data = image_file.read()
        image_base64 = base64.b64encode(image_data).decode('utf-8')
        
        # Prompt
        prompt = f"""You are an expert agricultural botanist and plant pathologist with deep knowledge of Indian farming. 
        Respond in {lang_name} using simple, farmer-friendly language.

Analyze this plant/crop image carefully and provide:

1. PLANT IDENTIFICATION: What type of plant/crop is this? (be specific - e.g., "Tomato plant", "Rice crop", "Wheat", etc.)

2. HEALTH ASSESSMENT: 
   - Does the plant look healthy or diseased?
   - Any visible symptoms like spots, yellowing, wilting, pest damage?

3. DISEASE/PROBLEM IDENTIFICATION (if any):
   - Name of the disease/problem
   - Severity level (mild/moderate/severe)

4. TREATMENT RECOMMENDATIONS (if disease found):
   - Immediate actions to take
   - Organic/chemical treatment options available in India
   - Prevention methods for future

5. ADDITIONAL ADVICE:
   - General care tips for this plant
   - Optimal growing conditions for Indian climate

Please be practical and provide actionable solutions that are cost-effective for Indian farmers. Focus on treatments and methods easily available in rural areas."""
        
        # image to Gemini
        image_part = {
            "mime_type": image_file.mimetype,
            "data": image_base64
        }
        
        response = model.generate_content([prompt, image_part])
        analysis = response.text.strip()
        
        disease_words = [
            "disease", "sick", "problem", "infection", "pest", "damage", "blight", "spot", "rot", "wilt",
            "रोग", "बीमारी", "समस्या", "कीड़े", "खराब",  # Hindi
            "രോഗം", "അസുഖം", "പ്രശ്നം", "കീടം",  # Malayalam
            "நோய்", "பிரச்சனை", "வியாधி", "பூச்சி",  # Tamil
            "ರೋಗ", "ಸಮಸ್ಯೆ", "ಅನಾರೋಗ್ಯ", "ಕೀಟ"  # Kannada
        ]
        
        has_disease = any(word in analysis.lower() for word in disease_words)
        
        plant_name = "Plant Analyzed"
        common_plants = {
            "tomato": "Tomato Plant", "rice": "Rice Crop", "wheat": "Wheat Crop",
            "potato": "Potato Plant", "cotton": "Cotton Plant", "corn": "Corn/Maize",
            "chili": "Chili Plant", "onion": "Onion Plant", "cabbage": "Cabbage Plant"
        }
        
        for plant_key, plant_value in common_plants.items():
            if plant_key in analysis.lower():
                plant_name = plant_value
                break
        
        # result
        if has_disease:
            disease_name = "Disease/Problem Detected"
            if "blight" in analysis.lower():
                disease_name = "Blight Disease"
            elif "fungal" in analysis.lower():
                disease_name = "Fungal Infection"
            elif "pest" in analysis.lower():
                disease_name = "Pest Infestation"
                
            return jsonify({
                "plant_name": plant_name,
                "disease_detected": True,
                "disease_name": disease_name,
                "treatment_advice": analysis,
                "language": language 
            })
        else:
            return jsonify({
                "plant_name": plant_name,
                "disease_detected": False,
                "message": analysis,
                "language": language
            })
    
    except Exception as e:
        return jsonify({"error": f"Cannot analyze image: {str(e)}"})

@app.route("/weather", methods=["POST"])
def get_weather():
    data = request.get_json()
    location = data.get("location", "").strip()
    
    if not location:
        return jsonify({"error": "Location needed"})
    
    try:
        current_url = f"http://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={location}&aqi=yes"
        forecast_url = f"http://api.weatherapi.com/v1/forecast.json?key={WEATHER_API_KEY}&q={location}&days=10&aqi=no&alerts=yes"

        current_response = requests.get(current_url, timeout=10)
        current_data = current_response.json()

        forecast_response = requests.get(forecast_url, timeout=10)
        forecast_data = forecast_response.json()
        
        if "error" in current_data or "error" in forecast_data:
            return jsonify({"error": "Cannot get weather data"})

        current = current_data['current']
        location_info = current_data['location']
        
        place = f"{location_info['name']}, {location_info['region']}, {location_info['country']}"

        current_weather = {
            "temperature": current['temp_c'],
            "feels_like": current['feelslike_c'],
            "condition": current['condition']['text'],
            "humidity": current['humidity'],
            "wind_kph": current.get('wind_kph', 0),
            "wind_dir": current.get('wind_dir', 'N/A'),
            "pressure": current.get('pressure_mb', 0),
            "visibility": current.get('vis_km', 0),
            "uv_index": current.get('uv', 0),
            "last_updated": current['last_updated']
        }

        if 'air_quality' in current:
            current_weather['air_quality'] = {
                "co": current['air_quality'].get('co', 0),
                "pm2_5": current['air_quality'].get('pm2_5', 0),
                "pm10": current['air_quality'].get('pm10', 0)
            }

        forecast_days = []
        for day in forecast_data['forecast']['forecastday']:
            forecast_days.append({
                "date": day['date'],
                "max_temp": day['day']['maxtemp_c'],
                "min_temp": day['day']['mintemp_c'],
                "condition": day['day']['condition']['text'],
                "rain_chance": day['day']['daily_chance_of_rain'],
                "humidity": day['day']['avghumidity'],
                "wind_kph": day['day']['maxwind_kph']
            })

        alerts = []
        temp_c = current['temp_c']
        condition = current['condition']['text'].lower()
        humidity = current['humidity']
        wind_kph = current.get('wind_kph', 0)

        # Alerts
        if temp_c > 40:
            alerts.append("🔥 EXTREME HEAT: Very high temperature! Increase irrigation frequency and provide shade for crops.")
        elif temp_c > 35:
            alerts.append("⚠️ HEAT WARNING: High temperature! Ensure adequate water supply for crops.")
        elif temp_c < 10:
            alerts.append("❄️ FROST ALERT: Very low temperature! Protect sensitive crops from frost damage.")
        elif temp_c < 15:
            alerts.append("🌡️ COLD WARNING: Low temperature! Monitor cold-sensitive crops.")
        
        if "rain" in condition or "shower" in condition:
            alerts.append("🌧️ RAIN EXPECTED: Good for soil moisture but watch for waterlogging and fungal diseases.")
        elif "storm" in condition or "thunder" in condition:
            alerts.append("⛈️ STORM WARNING: Severe weather expected! Secure crops and farming equipment.")
        elif "sunny" in condition and temp_c > 30:
            alerts.append("☀️ HOT & SUNNY: Perfect for drying crops but ensure adequate irrigation.")
        
        if humidity > 85:
            alerts.append("💧 HIGH HUMIDITY: High risk of fungal infections. Monitor crops closely and ensure good ventilation.")
        elif humidity < 25:
            alerts.append("🌵 LOW HUMIDITY: Dry conditions. Increase irrigation and consider mulching.")
        
        if wind_kph > 30:
            alerts.append("💨 STRONG WINDS: Secure tall crops and lightweight equipment. Risk of crop damage.")
        elif wind_kph > 20:
            alerts.append("🌬️ MODERATE WINDS: Monitor tall crops for wind damage.")
        
        if current.get('uv', 0) > 8:
            alerts.append("🔆 HIGH UV INDEX: Protect yourself when working outdoors. Consider shade for sensitive crops.")
        
        for i, day in enumerate(forecast_days[:1]):
            if day['rain_chance'] > 70:
                alerts.append(f"🌧️ RAIN FORECAST: High chance of rain in {i+1} day(s). Plan field activities accordingly.")
            if day['max_temp'] > 40:
                alerts.append(f"🔥 HEAT FORECAST: Very hot weather expected in {i+1} day(s). Prepare irrigation systems.")

        return jsonify({
            "current_weather": current_weather,
            "forecast": forecast_days,
            "alerts": alerts,
            "location_name": place,
            "success": True
        })
    except Exception as e:
        return jsonify({"error": f"Error fetching weather data: {str(e)}"})

# Load Crop Price Data
try:
    crop_price_df = pd.read_csv("cropprice.csv")
except Exception as e:
    print(f"Error loading CSV: {e}")
    crop_price_df = pd.DataFrame()

@app.route('/crop_price', methods=['POST'])
def get_crop_price():
    data = request.get_json()
    crop_name = data.get('crop_name', '').strip()
    state_name = data.get('state', '').strip()
    
    if crop_price_df.empty:
         return jsonify({"error": "Price database unavailable"})
         
    if not crop_name or not state_name:
        return jsonify({"error": "Crop name and state name are required"})

    # Filter by crop and state (case-insensitive)
    matches = crop_price_df[
        crop_price_df['Commodity'].str.lower().str.contains(crop_name.lower(), na=False) &
        crop_price_df['State'].str.lower().str.contains(state_name.lower(), na=False)
    ]
    
    if matches.empty:
        return jsonify([]) # Return empty list

    result = matches[[
        "State", "District", "Market", "Commodity", "Arrival_Date",
        "Min_x0020_Price", "Max_x0020_Price", "Modal_x0020_Price"
    ]].to_dict(orient='records')
    
    formatted_result = []
    for item in result:
        formatted_result.append({
            "Market": item['Market'],
            "Price": item['Modal_x0020_Price'],
            "Date": item['Arrival_Date']
        })

    return jsonify(formatted_result)

@app.route("/schemes", methods=["POST"])
def get_schemes():
    data = request.json
    language = data.get("language", "en")
    
    schemes_path = os.path.join(os.path.dirname(__file__), 'schemes.json')
    
    try:
        with open(schemes_path, 'r', encoding='utf-8') as f:
            schemes_data = json.load(f)
            
        formatted_schemes = []
        for item in schemes_data:
            # Get name in requested language or fallback to English
            name = item['scheme_name'].get(language, item['scheme_name'].get('en', 'Unknown Scheme'))
            
            # Get description in requested language or fallback to English
            desc = item['description'].get(language, item['description'].get('en', 'No description available'))
            
            formatted_schemes.append({
                "scheme": name,
                "details": desc
            })
            
        return jsonify({"schemes": formatted_schemes})
        
    except FileNotFoundError:
        return jsonify({"error": "Schemes database not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.errorhandler(413)
def file_too_large(e):
    return jsonify({"error": "File too large. Maximum size is 5MB"}), 413
 
if __name__ == "__main__":
    app.run(debug=True)