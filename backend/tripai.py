import json
import os
from datetime import datetime
from langchain_openai import ChatOpenAI

# Function to create an instance of ChatOpenAI
def get_llm_instance():
    openai_key = os.environ.get('OPENAI_API_KEY')
    if not openai_key:
        raise ValueError("OpenAI API key not found. Please set OPENAI_API_KEY in the environment.")
    return ChatOpenAI(openai_api_key=openai_key)

# Function to create a prompt for Langchain
def create_llm_prompt(filters):
    # Convert dates to a more human-friendly format
    start_date = datetime.strptime(filters['startDate'], '%Y-%m-%d').strftime('%B %d, %Y')
    end_date = datetime.strptime(filters['endDate'], '%Y-%m-%d').strftime('%B %d, %Y')

    number_of_days = (datetime.strptime(filters['endDate'], '%Y-%m-%d') - 
                      datetime.strptime(filters['startDate'], '%Y-%m-%d')).days + 1

    prompt_parts = [
        f"Plan a detailed {number_of_days}-day itinerary for a trip to {filters['city']} from {start_date} to {end_date}.",
        f"The budget for this trip is between {filters.get('budgetMin', 'a minimum amount')} and {filters.get('budgetMax', 'a maximum amount')} for {filters['numberOfPersons']} traveler(s).",
        "The traveler is interested in activities that are "]

    activities_selected = filters.get('activities', [])
    prompt_parts.append(", ".join(activities_selected) + "." if activities_selected else "not specified, please suggest some popular choices.")

    prompt_parts.append("For dining, the traveler prefers " + ", ".join(filters.get('cuisines', [])) + " cuisine")
    prompt_parts.append("with a preference for " + ", ".join(filters.get('foodTypes', [])) + " food types.")
    prompt_parts.append("Include meals: " + ", ".join(filters.get('mealsIncluded', [])) + ".")

    prompt_parts.append("For accommodation, the traveler is looking for a " +
                        "/".join(filters.get('accommodationTypes', [])) + " with amenities such as " +
                        ", ".join(filters.get('specificAmenities', [])) + ".")

    prompt_parts.append(f"The itinerary should plan for {filters.get('activityPerDay', 'some')} activities per day.")

    complete_prompt = " ".join(prompt_parts)

    complete_prompt += "\n\nPlease provide several options for activities and meals where possible, "
    complete_prompt += "\n including alternatives for flexibility. The itinerary should be structured with clear headings for each day, "
    complete_prompt += "\n including times, locations, and estimated costs where applicable. Also, include transport options between activities "
    complete_prompt += "\n and any necessary booking information or important details. Return the output in json format including details for each day such as activities, meal options, and approximate costs."
    return complete_prompt

# Function to call Langchain with the prompt
def call_langchain(llm_prompt):
    llm = get_llm_instance()
    response = llm.invoke(llm_prompt)
    return json.loads(response.content)