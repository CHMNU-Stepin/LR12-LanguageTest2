$(document).ready(function () {
    const words = {
        easy: [
            { word: "apple", translation: "яблуко" },
            { word: "banana", translation: "банан" },
            { word: "cat", translation: "кіт" },
            { word: "dog", translation: "пес" },
            { word: "sun", translation: "сонце" },
            { word: "moon", translation: "місяць" },
            { word: "water", translation: "вода" },
            { word: "tree", translation: "дерево" },
            { word: "book", translation: "книга" },
            { word: "flower", translation: "квітка" }
        ],
        medium: [
            { word: "adventure", translation: "пригоди" },  
            { word: "courage", translation: "відвага" },  
            { word: "journey", translation: "подорож" },  
            { word: "celebration", translation: "святкування" },  
            { word: "reflection", translation: "рефлексія" },  
            { word: "mystery", translation: "загадка" },  
            { word: "serenity", translation: "спокій" },  
            { word: "sympathy", translation: "співчуття" },  
            { word: "creativity", translation: "креативність" },  
            { word: "perseverance", translation: "витривалість" },  
        ],
        hard: [
            { word: "exacerbate", translation: "ускладнювати" },  
            { word: "equivocate", translation: "плутати" },  
            { word: "juxtaposition", translation: "зіставлення" },  
            { word: "idiosyncrasy", translation: "індивідуальність" },  
            { word: "epiphany", translation: "просвітлення" },  
            { word: "metamorphosis", translation: "перетворення" },  
            { word: "succinct", translation: "лаконічний" },  
            { word: "aberration", translation: "відхилення" },  
            { word: "unscrupulous", translation: "безпринциповий" },  
            { word: "insurmountable", translation: "непереборний" }, 
        ],
    };
    let shuffledWords = [];
    let currentWordIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    $("#start-button").click(function () {
        const difficulty = $("#difficulty").val();
        shuffledWords = words[difficulty].sort(() => Math.random() - 0.5);
        $(".difficulty-selector").addClass("hidden");
        $(".game").removeClass("hidden");
        initializeGame();
    });
    function initializeGame() {
        currentWordIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        updateStats();
        showWord();
    }
    function updateStats() {
        $(".correct .value").text(correctCount);
        $(".incorrect .value").text(incorrectCount);
        $(".progress").text(`${currentWordIndex + 1}/${shuffledWords.length}`);
    }
    function showWord() {
        const currentWord = shuffledWords[currentWordIndex];
        $(".card").text(currentWord.word);
        $("#translation-input").val("").focus();
    }
    function checkAnswer() {
        const userAnswer = $("#translation-input").val().trim().toLowerCase();
        const correctAnswer = shuffledWords[currentWordIndex].translation;
        if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        currentWordIndex++;
        if (currentWordIndex < shuffledWords.length) {
            updateStats();
            showWord();
        } else {
            showResult();
        }
    }
    function showResult() {
        const percentage = Math.round((correctCount / shuffledWords.length) * 100);
        $("#result-message").text(`Ви знаєте англійську на ${percentage}%!`);
        $(".modal").removeClass("hidden");
    }
    $("#restart-button").click(function () {
        $(".modal").addClass("hidden");
        $(".difficulty-selector").removeClass("hidden");
        $(".game").addClass("hidden");
    });
    $("#check-button").click(checkAnswer);
    $("#translation-input").keypress(function (e) {
        if (e.which === 13) {
            checkAnswer();
        }
    });
});
