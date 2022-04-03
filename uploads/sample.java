/**
 * 
 */
package mathGame;

import java.util.Random;
import java.util.Scanner;


public class Main {

	public static void main(String[] args) {
		
		System.out.println("***************** Welcome to Game of Math ***********************");
	    Scanner scanner = new Scanner(System.in);

	    //genrating random numbers
	    Random random = new Random();
	    
	    
	    for (int i = 0; i < 10; i++) {
	    	int num1 = random.nextInt(50);
		    int num2=  random.nextInt(50);
	    	
	    	int result = 0;
	 	    String randomMathOp = "+-";
	 	    final int mathOpIndex = randomMathOp.length();
	 	    Random r = new Random();
	 	    
	 	    char mathOp = randomMathOp.charAt(r.nextInt(mathOpIndex));
             
	 	   switch (mathOp){
	        case '+':
	            result = num1+num2;
	            break;
	        case '-':
	            result = num1-num2;
	            break;
	 	   }
	 	  System.out.println("What is "+num1+mathOp+num2);
	 	    int answerInput = scanner.nextInt();

	 	    if(answerInput == result){
	 	        System.out.println("Correct");
	 	    }
	 	    else {
	 	        System.out.println("Wrong");
	 	    }
	    }
	}
}
