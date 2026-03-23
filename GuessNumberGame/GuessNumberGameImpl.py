import random

number = random.randint(1, 100)
guess = None
count = 0

print("Welcome to the guess number game, I have had one random number.")

while guess != number:
    try:
        guess = int(input("enter your guess: "))
        count += 1
        if guess < number:
            print("It is lower, guess greater!")
        elif guess > number:
            print("It is greater, guess lower!")
    except ValueError:
        print("Pls enter a integer!")

print(f"Congratulations！You guess correctly {count} times. The answer is {number}.")