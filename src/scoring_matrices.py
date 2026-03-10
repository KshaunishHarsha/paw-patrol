# Lifestyle
energy_matrix = {
("low","high"):0.2,
("medium","high"):0.6,
("high","high"):1.0,
("high","medium"):0.8,
("medium","medium"):1.0,
("low","medium"):0.5,
("medium","low"):0.6,
("low","low"):1.0,
("high","low"):0.7
}

time_matrix = {
("low","high"):0.2,
("medium","high"):0.6,
("high","high"):1,
("medium","medium"):1,
("high","medium"):0.9,
("low","medium"):0.5,
("low","low"):1
}


# Financial
financial_matrix = {
("low","low"):1,
("medium","low"):1,
("high","low"):1,
("medium","medium"):1,
("high","medium"):1,
("low","medium"):0.5,
("low","high"):0.2,
("medium","high"):0.6,
("high","high"):1
}


# Experience
experience_matrix = {
("beginner","beginner"):1,
("beginner","intermediate"):0.6,
("beginner","experienced"):0.2,
("intermediate","beginner"):1,
("intermediate","intermediate"):1,
("intermediate","experienced"):0.7,
("experienced","beginner"):1,
("experienced","intermediate"):1,
("experienced","experienced"):1
}


# Grooming
grooming_matrix = {
("low","high"):0.2,
("medium","high"):0.6,
("high","high"):1,
("medium","medium"):1,
("high","medium"):1,
("low","medium"):0.5,
("low","low"):1
}


# Vet commitment
vet_matrix = {
("low","high"):0.2,
("medium","high"):0.6,
("high","high"):1,
("medium","medium"):1,
("high","medium"):1,
("low","medium"):0.5,
("low","low"):1
}


# Behavior
behavior_matrix = {
("low","high"):0.2,
("medium","high"):0.6,
("high","high"):1,
("high","medium"):0.9,
("medium","medium"):0.8,
("low","medium"):0.5,
("low","low"):1
}


# Commitment
commitment_matrix = {
("no","10-13 years"):0.3,
("no","12-16 years"):0.3,
("yes","10-13 years"):1,
("yes","12-16 years"):1
}


# Training compatibility
training_matrix = {
("low","experienced"):0.2,
("medium","experienced"):0.6,
("high","experienced"):1,
("high","intermediate"):1,
("medium","intermediate"):0.8,
("low","intermediate"):0.5,
("low","beginner"):1
}


# Noise tolerance
noise_matrix = {
("low","high"):0.2,
("medium","high"):0.6,
("high","high"):1,
("high","medium"):0.8,
("medium","medium"):1,
("low","medium"):0.5,
("low","low"):1
}


# Insurance compatibility
insurance_matrix = {
("no","high"):0.3,
("yes","high"):1,
("yes","medium"):1,
("no","medium"):0.6,
("yes","low"):1,
("no","low"):1
}