import random
import os

best_file = "best_score.txt" # Define one file to set the best score

def load_best_score():
    """search the history best score, if no file, return None"""
    if os.path.exists(best_file):
        with open(best_file, "r") as f:
            return int(f.read().strip())
    return None

def save_best_score(score):
    """set the new best score"""
    with open(best_file, "w") as f:
        f.write(str(score))

def choose_difficulty():
    """choose the difficulty level, return low, high"""
    print("\nchoose the difficulty level：")
    print("1. easy (1~50)")
    print("2. middle (1~100)")
    print("3. difficult (1~200)")
    while True:
        choice = input("enter 1/2/3：").strip()
        if choice == "1":
            return 1, 50
        elif choice == "2":
            return 1, 100
        elif choice == "3":
            return 1, 200
        else:
            print("Entering is inavailable!")

def play_game():
    """start the game, and return guess times"""
    low, high = choose_difficulty()
    secret = random.randint(low, high)
    attempts = 0
    print(f"\nI choose the difficulty {low}~{high} , let us start!")

    while True:
        try:
            guess = int(input("Enter your guess: "))
            attempts += 1
            if guess < secret:
                print("too lower")
            elif guess > secret:
                print("too greater")
            else:
                print(f"Congratulations！You guess {attempts} times. answer is {secret}.")
                return attempts
        except ValueError:
            print("Pls enter an integer!")
            
def main():
    print("=== Guess Number Game ===")
    best = load_best_score()
    if best is not None:
        print(f"The best score：{best} times")
    else:
        print("There is no history, waiting for you to set!")

    while True:
        attempts = play_game()
        # Check if the record has been broken
        if best is None or attempts < best:
            best = attempts
            save_best_score(best)
            print(f"🎉 Congratulations！You only guess {attempts} times！")
        else:
            print(f"You guess {attempts} times，the best score also is {best} times.")
        # Ask if play again
        again = input("\nPlay again?(y/n)：").strip().lower()
        if again != 'y':
            print("Thank you, bye!")
            break

if __name__ == "__main__":
    main()
