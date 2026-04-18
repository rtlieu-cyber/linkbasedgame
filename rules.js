class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}
//meow
class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        //items!
        if(locationData.Gives) {
            for (let item of locationData.Gives) {
                this.engine.addItem(item);
                this.engine.show(`You got an item: ${item}!`);
            }
        }
        //interactables!
        if(locationData.Interactables) {
            for(let interactable of locationData.Interactables) {
                this.engine.addInteractable(interactable.Text, interactable, interactable.Item);
            }
        }

        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                //lalala this is if the location needs an item
                if (choice.Requires && !this.engine.hasItem(choice.Requires)) {
                    this.engine.addChoice(choice.LockedText || choice.Text, null, true); // TODO: use the Text of the choice
                }
                else {
                    this.engine.addChoice(choice.Text, choice);
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }

    handleInteractable(interactable) {
        this.engine.show(interactable.Message);
    }
}


class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');