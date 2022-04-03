package mathGame;

import java.util.Random;
import java.util.Scanner;

public class MathGame {

	public static int highScore = 0;

	public void startGame(int numOfQuestions) {

		System.out.println("***************** Welcome to Math Game ***********************");

		Scanner scanner = new Scanner(System.in);

		// will terminate the loop when user will select NO
		while (true) {
			int score = 0;

			Question q = new Question();
			for (int i = 0; i < numOfQuestions; ++i) {

				String[] generatedQuestion = q.GenerateQuestion();

				String question = generatedQuestion[0];
				double result = Double.parseDouble(generatedQuestion[1]);

				System.out.println(question);

				double inputAns = scanner.nextDouble();

				if (inputAns == result) {
					System.out.println(GenerateMessage("Right"));
					score += 10;
				} else {
					System.out.println("Ooops, Wrong Answer. Please try again");
					System.out.println(question);
					inputAns = scanner.nextDouble();

					if (inputAns == result) {
						System.out.println(GenerateMessage("Right"));
						score += 5;
					} else {
						System.out.println(GenerateMessage("Wrong"));
					}
				}
			}

			System.out.println("Your Score is " + score);

			// updating HighScore
			if (score > highScore) {
				highScore = score;
			}

			System.out.println("Do you want to play again ?(y/n)");

			if (scanner.next().equals("n"))
				break;
		}
		scanner.close();

	}

	private String GenerateMessage(String AnswerType) {
		String MessageOutput = "";

		String[] wrongs = { "Ooops, Wrong Answer :( ", "Wrong Answer", "Sorry! thats incorrect" };
		String[] rights = { "Oh yea thats right", "Your math is good", "Correct Answer" };

		Random random = new Random();

		int randomInt = random.nextInt(3);
		if (AnswerType == "Right") {
			MessageOutput = rights[randomInt];
		} else {
			MessageOutput = wrongs[randomInt];
		}
		return MessageOutput;
	}
}
