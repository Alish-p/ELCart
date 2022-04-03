
package mathGame;

import java.util.Random;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {

		System.out.println("***************** Welcome to Math Game ***********************");
		Scanner scanner = new Scanner(System.in);
		Random random = new Random();

		int numOfQuestions = 5;

		// will terminate the loop when user will select NO
		while (true) {
			int score = 0;

			for (int i = 0; i < numOfQuestions; ++i) {

				// generating random numbers between 0-50
				int num1 = random.nextInt(50);
				int num2 = random.nextInt(50);

				// selecting random operator from (+ -)
				String operators = "+-";
				char operator = operators.charAt(random.nextInt(operators.length()));

				double result = 0;

				switch (operator) {
				case '+':
					result = num1 + num2;
					break;
				case '-':
					result = num1 - num2;
					break;
				}

				String question = "What is " + num1 + operator + num2 + " ?";
				System.out.println(question);

				double inputAns = scanner.nextDouble();

				if (inputAns == result) {
					System.out.println("Correct Answer !");
					score += 10;
				} else {
					System.out.println("Wrong Answer !");
					score += 0;
				}
			}
			System.out.println("Your Score is " + score);
			System.out.println("Do you want to play again ?(y/n)");

			if (scanner.next().equals("n"))
				break;
		}

	}

}
