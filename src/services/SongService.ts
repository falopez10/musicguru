import { Song, SongsResponse } from "../models";
import { request } from "./RestService";

const URL = "https://api.github.com/gists/11fcbe830fa8057f1693f7c823423886";

/**
 * Emulates server pagination
 * @param itemsPerPage number of songs displayed per page
 * @param page 0-indexed page number
 * @param songName string to filter retrieved songs
 */
export async function fetchSongs(itemsPerPage: number, page: number, songName: string | null): Promise<SongsResponse> {
    const gist = await request(URL);
    const content: string = gist.files["music.json"].content;
    let allSongs: Song[] = JSON.parse(content);
    if (songName) {
        allSongs = allSongs.filter(({ composition }) => composition.toUpperCase().includes(songName.toUpperCase()));
    }
    const currentSongs = allSongs.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
    return {
        pages: Math.floor(allSongs.length / itemsPerPage),
        songs: currentSongs
    };
}

/**
 * Returns all favorite songs.
 * @param favoriteSongIds object with favorite ids as keys (1 as value if it's favorite)
 */
export async function fetchFavoriteSongs(favoriteSongIds: Record<number, number>): Promise<Song[]> {
    const gist = await request(URL);
    const content: string = gist.files["music.json"].content;
    let allSongs: Song[] = JSON.parse(content);
    return allSongs.filter(({ id }) => favoriteSongIds[id]);
}

export async function fetchSong(id: number): Promise<Song> {
    const gist = await request(URL);
    const content: string = gist.files["music.json"].content;
    const allSongs: Song[] = JSON.parse(content);
    const song = allSongs.find(({ id: _id }) => id === _id);
    if (!song) throw new Error(`There's no song with id ${id}`);
    return song;
}
