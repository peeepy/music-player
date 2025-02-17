export class Song {
    constructor(title, artist, filePath, albumArt = null) {
        this.next = null;
        this.prev = null;
        this.title = title;
        this.artist = artist;
        this.filePath = filePath;
        this.albumArt = albumArt;
    }
}
export class Playlist {
    constructor(name) {
        this.head = null;
        this.tail = null;
        this.name = name;
        this.current = null;
        this.length = 0;
    }

    // could pass in title & artist here and
    // create node in method but I don't want to
    addSong(newSong) {
        if (!this.head) {
            this.head = newSong;
            this.current = newSong;
            this.tail = newSong;
        } else {
            newSong.prev = this.tail;
            newSong.next = null;
            this.tail.next = newSong;
            this.tail = newSong;
        }
        this.length++;
        return true;
    }

    removeSong(song) {
        if (!this.head) return;

        if (this.head.title === song.title) {
            this.head = this.head.next;
            this.head.prev = null;
            // decrement the length of the array
            this.length--;
            return true;
        }

        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.title === song.title) {
                if (currentNode.prev) currentNode.prev.next = currentNode.next;
                if (currentNode.next) currentNode.next.prev = currentNode.prev;
                // decrement the length of the array
                this.length--;
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }

    playNext() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
            return this.current;
        }
        return null;
    }

    playPrevious() {
        if (this.current && this.current.prev) {
            this.current = this.current.prev;
            return this.current;
        }

        return null;
    }

    displayPlaylist() {
        let current = this.head;
        console.log(`${this.name}\n`)
        while (current) {
            console.log(`${current.title} - ${current.artist}\n`);
            current = current.next;
        }
    }
}

function testMusicPlaylist() {
    // Create a new playlist
    const britPopPlaylist = new Playlist("2010s British Pop");

    const ritd = new Song("Rolling in the Deep", "Adele")
    const sio = new Song("Shake It Out", "Florence + The Machine")
    const wmu = new Song("Wake Me Up", "One Direction")
    // Add some songs
    britPopPlaylist.addSong(ritd);
    britPopPlaylist.addSong(sio);
    britPopPlaylist.addSong(wmu);

    // Print initial playlist
    console.log("Initial Playlist:");
    britPopPlaylist.displayPlaylist();

    // Demonstrate navigation
    console.log("\nNavigating through playlist:");
    console.log("Current Song:", britPopPlaylist.current.title);

    const nextSong = britPopPlaylist.playNext();
    console.log("Next Song:", nextSong.title);

    const previousSong = britPopPlaylist.playPrevious();
    console.log("Back to Previous Song:", previousSong.title);

    // Remove a song
    console.log("\nRemoving 'Wake Me Up'");
    britPopPlaylist.removeSong(wmu);

    // Print current playlist
    console.log("Current Playlist:");
    britPopPlaylist.displayPlaylist();

    // Potential error scenarios (commented out)
    // britPopPlaylist.removeSong("Non-existent Song");
    // britPopPlaylist.next(); // At end of playlist
    // britPopPlaylist.previous(); // At start of playlist
}

// Run the test
testMusicPlaylist();