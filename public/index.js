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

		init: function() {
			var self = this;
			this.dictionary = this.getDictionary();
			this.uiInput.bind('change', function() {
				$(this).removeClass("invalid").removeClass("valid");
				if ($(this).val() === $(this).attr("data-answer")) {
					$(this).addClass("valid");
					self.uiNext.show();
					self.uiSkip.hide();
				} else {
					$(this).addClass("invalid");
					self.uiNext.hide();
					self.uiSkip.show();
				}
			});
			this.uiSkip.bind("click", function() {
				self.uiInput.val(self.uiInput.attr("data-answer"));
				self.uiNext.show();
				self.uiSkip.hide();
			});
			this.uiNext.bind("click", function() {
				self.resetScene();
				self.setScene();
			});
			this.setScene();
		},

		resetScene: function() {
			this.uiInput.removeClass("invalid").removeClass("valid");
			this.uiInput.val("");
		},

		deleteScene: function() {
			this.uiScene.text("There are no items in dictionary!");
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

		setScene: function() {
			var item = this.getNextItemFromDictionary();
			if (item === undefined) {
				this.deleteScene();
			} else {
				this.uiQuestion.text(item.ru);
				this.uiInput.attr("data-answer", item.en);
				this.uiLetters.text(_.shuffle(item.en.split("")).join());
				this.uiNext.hide();
				this.uiSkip.show();
				this.uiInput.focus();
			}
		},

		getNextItemFromDictionary: function() {
			return this.dictionary.pop();
		}
	}
	app.init();

});