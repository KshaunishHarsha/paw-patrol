import pandas as pd


def load_pets(path=r"data\datasets\processed\pets_dataset_final.csv"):
    return pd.read_csv(path)


def load_adopters(path=r"data\datasets\processed\adopters_dataset.csv"):
    return pd.read_csv(path)