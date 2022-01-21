import { Song } from "./Song";

export interface SongsResponse {
    pages: number;
    songs: Song[];
}