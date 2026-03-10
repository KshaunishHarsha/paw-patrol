from fastapi import APIRouter
from ..matcher import match_pets
from ..load_data import load_pets
from ..dashboard import generate_match_dashboard

router = APIRouter(prefix="/matching")

pets = load_pets("data/datasets/processed/pets_dataset_final.csv")


@router.post("/match")
def match(data: dict):

    adopter_profile = data.get("adopter_profile")

    matches = match_pets(adopter_profile, pets)

    return {
        "matches": matches
    }


@router.post("/explain")
def explain_match(data: dict):

    adopter = data.get("adopter_profile")
    pet_id = data.get("pet_id")

    pet = pets[pets["PetID"] == pet_id].iloc[0].to_dict()

    dashboard = generate_match_dashboard(adopter, pet)

    return dashboard