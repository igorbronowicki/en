$(function(){


    var app = {
        dictionary: [],

        // some ui elements
        uiQuestion: $("#question"),
        uiScene: $("#scene"),
        uiInput: $("#input"),
        uiNext: $("#next"),
        uiSkip: $("#skip"),
        uiLetters: $("#letters"),

        tplLetters: $("#tpl-letters").html(),
        tplInput: $("#tpl-input").html(),

        // Current state
        current: {
            question: undefined,
            input: undefined,
            answer: undefined,
            letters: undefined,
            position: undefined,
            finished: undefined
        },

        init: function() {
            var self = this;
            this.dictionary = this.getDictionary();

            this.uiSkip.bind("click", function() {
                self.setFinishScene();
            });

            this.uiNext.bind("click", function() {
                self.getNextItemFromDictionary();
            });

            $(document).keyup(function(event) {
                var set = "QWERTYUIOPASDFGHJKLZXCVBNM".toLowerCase().split("");
                var letter = String.fromCharCode(event.which).toLowerCase();
                if (event.which == 13) {
                    // Мы нажали Enter
                    if (self.current.finished) {
                        self.getNextItemFromDictionary();
                    } else {
                        self.setFinishScene();
                    }
                } else {
                    if (_.include(set, letter)) {
                        if (self.checkLetter(letter)) {                 // Проверка буквы
                            //$(this).remove();                           // Удаляем кубик
                            self.openLetter();                          // Открываем одну букву
                        } else {
                            /*
                            $(this).addClass("wrong");
                            setTimeout(function() {
                                $(el).removeClass("wrong");
                            }, 400);
                            */
                        }
                    } else {
                        console.log("not try");
                    }
                }
            });

            this.getNextItemFromDictionary();
        },

        getDictionary: function() {
            return [
                {
                    "en": "tree",
                    "ru": "дерево"
                },
                {
                    "en": "house",
                    "ru": "дом"
                },
                {
                    "en": "green",
                    "ru": "зеленый"
                },
                {
                    "en": "sun",
                    "ru": "солнце"
                }
            ];
        },

        setFinishScene: function() {
            this.setAnswer();
            this.uiLetters.hide();
            this.uiNext.show();
            this.uiSkip.hide();
            this.current.finished = true;
        },

        setStartScene: function() {
            this.uiQuestion.text(this.current.question);
            this.setInput();
            this.setLetters();
            this.uiLetters.show();
            this.uiNext.hide();
            this.uiSkip.show();
        },

        deleteScene: function() {
            this.uiScene.text("There are no items in dictionary!");
        },

        setLetters: function() {
            var self = this;

            var template = this.tplLetters;
            var context = this.current.letters.split("");
            this.uiLetters.html(Mustache.render(template, context));

            $("#letters span").bind("click", function() {
                var el = this;
                var letter = $(this).attr("data-letter");
                if (self.checkLetter(letter)) {                 // Проверка буквы
                    $(this).remove();                           // Удаляем кубик
                    self.openLetter();                          // Открываем одну букву
                } else {
                    $(this).addClass("wrong");
                    setTimeout(function() {
                        $(el).removeClass("wrong");
                    }, 400);
                }
            });
        },

        setInput: function() {
            var template = this.tplInput;
            var context = this.current.answer.split("");
            this.uiInput.html(Mustache.render(template, context));
        },

        setAnswer: function() {
            $("#input span").each(function(i, e) {
                $(e).text($(e).attr("data-letter")).addClass("correct");
            });
        },

        checkLetter: function(letter) {
            return this.current.answer[this.current.position] === letter ? true: false;
        },

        openLetter: function() {
            $($("#input span")[this.current.position]).text($($("#input span")[this.current.position]).attr("data-letter")).addClass("correct");
            if (this.current.position === this.current.answer.length-1) {
                // Мы только что открыли последнюю букву
                this.setFinishScene();
            } else {
                this.current.position++;
            }
        },

        getNextItemFromDictionary: function() {
            var item = this.dictionary.pop();
            if (item === undefined) {
                this.deleteScene();
            } else {
                this.current = {
                    question: item.ru,
                    input: "",
                    answer: item.en,
                    letters: _.shuffle(item.en.split("")).join(""),
                    position: 0,
                    finished: false
                }
                this.setStartScene();
            }
        }
    }
    app.init();

});