function submitFeedback() {
    const rating = document.getElementById('rating').value;
    const imageFile = document.getElementById('image').files[0];
    const textFile = document.getElementById('textFile').files[0];

    // Validate rating
    if (rating < 1 || rating > 5) {
        alert('Please enter a rating between 1 and 5.');
        return;
    }

    // Validate file uploads
    if (!imageFile || !textFile) {
        alert('Please upload both an image and a text file.');
        return;
    }

    // Simulate extracting data from the text file (replace with actual logic)
    const reader = new FileReader();
    reader.onload = function (event) {
        const textFileData = event.target.result;

        // Create an object with feedback details
        const feedbackDetails = {
            rating: parseInt(rating),
            image: imageFile.name,
            textData: textFileData
        };

        // Simulate sending feedback data to the server (replace 'api/submitFeedback' with your actual server endpoint)
        sendFeedbackToServer(feedbackDetails);
    };

    reader.readAsText(textFile);
}

function sendFeedbackToServer(feedbackDetails) {
    // Simulate sending feedback data to the server (replace with actual AJAX or fetch request)
    // For simplicity, this example uses the 'fetch' API
    fetch('api/submitFeedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackDetails)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Feedback submitted successfully:', data);
        // Handle success (e.g., display a success message to the user)
    })
    .catch(error => {
        console.error('Error submitting feedback:', error);
        // Handle error (e.g., display an error message to the user)
    });
}
