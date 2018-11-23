
$(document).ready(function () {
    //declaring variables

    var quizContent = [
        {
            question: "Which of these islands is not a part of Greece?",
            options: ["Crete", "Maldives", "Santorini", "Capri"],
            correct: 1,
            image: "assets/images/beach.gif",


        },
        {
            question: "Which city is also referred to as the 'Eternal City'?",
            options: ["Athens", "Rome", "Berlin", "Calcutta"],
            correct: 1,
            image: "assets/images/rome.gif",


        },
        {
            question: "Which is the largest city in Thailand?",
            options: ["Chiang Mai", "Pattaya", "Bangkok", "Chiang Rai"],
            correct: 2,
            image: "assets/images/bangkok.gif",


        },
        {
            question: "Which Indian city has the world's most expensive house?",
            options: ["Bangalore", "New Delhi", "Calcutta", "Mumbai"],
            correct: 3,
            image: "assets/images/home.jpg",

        },

        {
            question: "What is the name of the Japanese toy company that launched 'Hello Kitty' in 1974?",
            options: ["Sanrio", "Tomy", "Takara", "Sega Toys"],
            correct: 0,
            image: "assets/images/kitty.gif",

        },

        {
            question: "What is the national dish of South Korea?",
            options: ["Bibimbap", "Ddukbokki", "Kimchi", "Bulgogi"],
            correct: 2,
            image: "assets/images/kimchi.gif",

        },

        {
            question: "Which city in the U.K. is the home of the Buckingham Palace?",
            options: ["Liverpool", "Manchester", "Chester", "London"],
            correct: 3,
            image: "assets/images/london.gif",

        },

        {
            question: "Which place holds the record for the coldest day in Canadian history?",
            options: ["Snag, Yukon", "Fort Vermilion, Alberta", "Old Crow, Yukon", "Iroquois Falls, Ontario"],
            correct: 0,
            image: "assets/images/cold.gif",


        },

        {
            question: "What is the name of the world's largest canyon?",
            options: ["The Yarlung Tsangpo Canyon - Tibet", "The Grand Canyon - USA", "The Indus Gorge - Pakistan", "Cotahuasi Canyon - Peru"],
            correct: 0,
            image: "assets/images/canyon.jpg",


        },

        {
            question: "What is the name of the tallest mountain in Seattle, Washington?",
            options: ["Mount Adams", "Mount Baker", "Glacier Peak", "Mount Rainier"],
            correct: 3,
            image: "assets/images/rainier.jpg",



        }

    ];



    var correctAns = 0;
    var wrongAns = 0;
    var noAns = 0;
    var timer = 20;
    var userSelect = "";
    var intervalId;
    var clockRunning = false;
    var questionCounter = quizContent.length;
    var pick;
    var index = [];
    var alreadySelected = [];



    //start of the game

    $("#reset").hide();



    //click start to begin
    $("#start").on("click", function () {
        $("#start").hide();
        startTimer();
        showQuestion();

    })



    //--------------------------------------------------LIST OF FUNCTIONS------------------------------------------------------------------------------------------------------



    // Game Timer

    function startTimer() {
        if (!clockRunning) {
            timer = 20;
            intervalId = setInterval(decrement, 1000);
            clockRunning = true;
        }

    }

    function decrement() {
        $("#countDown").html("<h3> Time Left: " + timer + "</h3>");
        timer--;


        //if timer runs out
        if (timer === 0) {
            stop();
            $("#countDown").html("<h3> Time Left: " + timer + "</h3>");
            noAns++;
            $("#showQuestion").html("<p>Time Over!</p>");
            $("#showAnswer").html("<p class='message'> The correct answer was: " + pick.options[pick.correct] + "</p>");
            $("#showAnswer").append("<img class= 'gif' src=" + pick.image + ">");
            setTimeout(showQuestion, 3000);



        }

    }

    //Stop Timer

    function stop() {
        clockRunning = false;
        clearInterval(intervalId);

    }



    //Show Questions

    function showQuestion() {



        //making sure questions displayed don't repeat

        index;
        if (questionCounter > 0) {
            do {
                index = Math.floor(Math.random() * quizContent.length);
            } while (alreadySelected.indexOf(index) !== -1)
        }


        alreadySelected.push(index);


        console.log(alreadySelected);

        //pick the question to be displayed    
        pick = quizContent[index];


        startTimer();
        decrement();
        console.log(questionCounter);
        $(".message").hide();
        $(".gif").hide();



        //Creating a div for each quizContent option
        $("#showQuestion").html("<h2>" + pick.question + "</h2>");

        for (var i = 0; i < pick.options.length; i++) {

            var displayOption = $("<div>");
            displayOption.addClass("answeroption");
            displayOption.html(pick.options[i]);
            displayOption.attr("data-answervalue", i);
            $("#showAnswer").append(displayOption);


        };



        if (questionCounter === 0) {
            stop();
            $("#showQuestion").empty();
            $("#showQuestion").html("<h2> Game Over! Here's how you did: </h2>")
            $("#showAnswer").empty();
            $("#showAnswer").append("<h3>Correct Answers: " + correctAns + "</h3");
            $("#showAnswer").append("<h3>Incorrect Answers: " + wrongAns + "</h3");
            $("#showAnswer").append("<h3>Unattempted Answers: " + noAns + "</h3");
            $("#reset").show();
            $("#reset").on("click", function () {
                resetGame();
            })


        };



        questionCounter--;
    }




    function resetGame() {
        //alreadySelected =[]

        $("#reset").hide();
        $("#showQuestion").empty();
        $("#showAnswer").empty();
        questionCounter = quizContent.length;
        alreadySelected = []
        correctAns = 0;
        wrongAns = 0;
        noAns = 0;
        showQuestion();
        startTimer();




    }

    // -------------------------------------------------USER INTERACTION-------------------------------------------------------------------------------------------------------------


    $("#showAnswer").on("click", ".answeroption", function () {
        //get index position from the selected option in array
        userSelect = parseInt($(this).attr("data-answervalue"));
        console.log('click')



        if (userSelect === pick.correct) {
            stop();
            $("#showAnswer").html("<p class = message>You Got it!</p>");
            $("#showAnswer").append("<img class= 'gif'  src=" + pick.image + ">");
            correctAns++;
            // console.log(questionCounter);
            console.log("Correct ans: " + correctAns)
            setTimeout(showQuestion, 3000);






        }


        else {
            stop();
            wrongAns++;
            $("#showAnswer").html("<p class= 'message'>Incorrect! <br> The correct answer was: " + pick.options[pick.correct] + "</p>")
            $("#showAnswer").append("<img class= 'gif' src=" + pick.image + ">");
            // console.log(questionCounter);
            console.log("wrong ans: " + wrongAns);
            setTimeout(showQuestion, 3000);




        }

    })


})





