function Recipe (title, steps) {
    this.title = 'Philou Cookies'
    this.steps = [
  [1, "cup", "white flour", "dry"],
  [0.5, "tsp", "baking soda", "wet"],
  [0.25, "tsp", "salt", "dry"],
  [0.25, "cup", "sugar", "dry"],
  [0.25, "cup", "brow sugar", "dry"],
  [0.25, "tbsp", "soy milk", "wet"],
  [0.25, "tbsp", "oil", "wet"],
  [0.25, "tsp", "pure vanilla extract", "dry"],
  ["Form into one big ball, then either refrigerate at least 2 hours or freeze until the dough is cold. Once dough is chilled, preheat oven to 325 F. Form dough balls, and place on a greased baking tray, leaving enough room between cookies for them to spread."],
  [325, 10]
];
}

Recipe.prototype.cook = function() {
    let ingredients = []
    let descriptions = []

    this.steps.forEach((step) => {

        if (step[3] === 'dry') {
            ingredients.push(`Add ${step[0]} ${step[1]} of ${step[2]} to the bowl`)
        }

        if (step[3] === 'wet') {
            ingredients.push(`For ${step[0]} ${step[1]} of ${step[2]} to the bowl`)
        }

        if (step.length === 1) {
            descriptions.push(step[0])
        }

        if (step.length === 2) {
            descriptions.push(`Then, heat ${step[0]} minutes in the oven at ${step[1]} degrees`)
        }
    })
       
    const stringifyIngredients = ingredients.join(', <br>').charAt(0).toUpperCase() + ingredients.join(', <br>').slice(1).toLowerCase() + '. <br>';
    const stringifyDescriptions = descriptions.join('<br>')
    const result = stringifyIngredients + stringifyDescriptions + '<br><br> Enjoy your meal !'

    document.body.innerHTML = '<h1>' + this.title + '</h1>'
    document.body.innerHTML += '<p>' + result + '</p>'
    
}

const cookies = new Recipe
cookies.cook()

