from load_data import load_pets, load_adopters
from matcher import match_pets


def main():

    pets = load_pets("data/datasets/processed/pets_dataset_final.csv")
    adopters = load_adopters("data/datasets/processed/adopters_dataset.csv")

    adopter = adopters.iloc[0].to_dict()

    matches = match_pets(adopter, pets)

    print("\nTop Pet Matches:\n")

    for match in matches:

        print(f"{match['Name']} — Score: {match['Score']}")

        print("Reasons:")

        for r in match["Explanation"]:
            print(f"  • {r}")

        if match["Risks"]:
            print("Potential concerns:")
            for risk in match["Risks"]:
                print(f"  ⚠ {risk}")

        print()


if __name__ == "__main__":
    main()