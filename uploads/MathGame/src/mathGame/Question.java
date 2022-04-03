/**
 * 
 */
package mathGame;

import java.util.Random;

/**
 * @author alish.palasara
 *
 */
public class Question {

	Random random = new Random();

	public String[] GenerateQuestion() {

		// generating random numbers between 0-50
		int num1 = random.nextInt(50);
		int num2 = random.nextInt(50);

		// selecting random operator from (+ - * /)
		String operators = "+-*/";
		char operator = operators.charAt(random.nextInt(operators.length()));

		double result = 0;

		String question = "";

		switch (operator) {
		case '+':
			result = num1 + num2;
			break;
		case '-':
			result = num1 - num2;
			break;
		case '*':
			result = num1 * num2;
			break;
		case '/':
			result = num1 / num2;
			break;
		}
		question = "What is " + num1 + operator + num2 + " ?";

		String[] output = { question, String.valueOf(result) };

		return output;
	}
}
