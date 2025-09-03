import os
import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Configure Gemini (make sure your API key is in .env or settings.py)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@csrf_exempt
def generate_excuse(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            category = data.get("category", "Random")
            twist = data.get("twist", "")

            prompt = f"""
            You are an absurd excuse generator bot.
            Create a funny, creative excuse for skipping the gym.
            Category: {category}.
            Twist (optional): {twist}.
            The excuse should be short but entertaining (1-3 sentences).
            """

            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)

            excuse = response.text.strip() if response and response.text else "Couldn’t generate an excuse 😅"

            return JsonResponse({"excuse": excuse})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)
