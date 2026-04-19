// This function handles quiz validation, scoring, and feedback display. It ensures all inputs are completed, evaluates answers, and provides results to user
function checkQuiz(event) {
    
    // Prevents the form from refreshing the page when submitted
    event.preventDefault();

    // Saves the user's answers. For text input, converts to lowercase and trims extra spaces to improve comparison accuracy 
    let q1 = document.querySelector('input[name="q1"]:checked');
    let q2 = document.getElementById("q2").value.toLowerCase().trim();
    let q3 = document.querySelector('input[name="q3"]:checked');
    let q4 = document.querySelector('input[name="q4"]:checked');
    let q5Answers = document.querySelectorAll('input[name="q5"]:checked');

    // Improves user experience by making sure all answers have been answered before grading
    if (!q1 || q2 === "" || !q3 || !q4 || q5Answers.length === 0) {
        let resultDiv = document.getElementById("results");
        resultDiv.innerHTML = `
            <p class="fail">Please answer all questions before submitting the quiz.</p>
        `;
        resultDiv.scrollIntoView({ behavior: "smooth" });
        return;
    }

    // Initializes the score value to zero
    let score = 0;

    // Question 1: Checks if the selected answer is correct
    let q1Correct = q1.value === "Correct";
    if (q1Correct) score++;

    // Question 2: Compares text input to correct answer (2 potential ways of writing both checked for)
    let q2Correct =
        q2 === "hypertext markup language" ||
        q2 === "hyper text markup language";
    if (q2Correct) score++;

    // Question 3
    let q3Correct = q3.value === "Correct";
    if (q3Correct) score++;

    // Question 4
    let q4Correct = q4.value === "Correct";
    if (q4Correct) score++;

    // Question 5: Checks multiple correct answers
    let correctAnswers = ["HTML", "CSS", "JavaScript"];
    let selected = [];

    // Stores the user's selected checkbox values into an array
    q5Answers.forEach(cb => selected.push(cb.value));

    // Ensures the user selected all correct answers and no incorrect options
    let q5Correct = selected.length === correctAnswers.length 
        && correctAnswers.every(answer => selected.includes(answer));

    if(q5Correct) score++;

    // Determines if the user passed (4 out 5 correct = passing)
    let resultDiv = document.getElementById("results");
    let passed=score >= 4;
    let passMessage=passed? "You passed!":"You did not pass. Try again.";

    // Get user's actual selections (for display)
    let q1Answer = q1.parentElement.textContent.trim();
    let q3Answer = q3.parentElement.textContent.trim();
    let q4Answer = q4.parentElement.textContent.trim();

    //Converts selected checkbox answers into a string
    let q5AnswerText = selected.join(", ");

    //Displays the final score and detailed feedback. Shows both the answers the user chose and
    //the correct answer for clarity. 
    resultDiv.innerHTML = `
        <h3>Your Score: ${score}/5</h3>
        <p class="${passed ? "pass" : "fail"}">${passMessage}</p>

        <p><strong>Question Results:</strong></p>
        <ul>
            <li>
                1. ${q1Correct ? "Correct" : "Incorrect"}<br>
                Your answer: ${q1Answer}<br>
                Correct answer: Tim Berners-Lee
            </li>

            <li>
                2. ${q2Correct ? "Correct" : "Incorrect"}<br>
                Your answer: ${q2}<br>
                Correct answer: Hypertext Markup Language
            </li>

            <li>
                3. ${q3Correct ? "Correct" : "Incorrect"}<br>
                Your answer: ${q3Answer}<br>
                Correct answer: To convert domain names into IP addresses
            </li>

            <li>
                4. ${q4Correct ? "Correct" : "Incorrect"}<br>
                Your answer: ${q4Answer}<br>
                Correct answer: Interactivity
            </li>

            <li>
                5. ${q5Correct ? "Correct" : "Incorrect"}<br>
                Your answer: ${q5AnswerText}<br>
                Correct answer: HTML, CSS, JavaScript
            </li>
        </ul>
    `;

     // Scrolls to the results and disables the submit button after grading to prevent duplicate submissions
    resultDiv.scrollIntoView({behavior: "smooth"});
    document.querySelector('button[type = "submit"]').disabled = true;
    }

    // Resets the form and clears the results area
    function resetQuiz() {
        //Clears all user selections
        document.getElementById("quiz-form").reset();

        //Removes any displayed results
        document.getElementById("results").innerHTML = "";

        // Re-enables the submit button for another attempt
        document.querySelector('button[type = "submit"]').disabled = false;
}