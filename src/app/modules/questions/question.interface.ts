interface Question {
    topic_id: string; // Associated topic ID
    text: string; // Question text
    options: string[]; // Array of options (A–D)
    correct_answer: string; // Correct option (A, B, C, or D)
    explanation: string; // Explanation of answer
}

export default Question;
