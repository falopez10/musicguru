export function useFavorite(
    id: number,
    email: string | null,
    favoriteSongIdsByUser: Record<string, Record<number, number>>,
    setFavoriteSongIdsByUser: (input: React.SetStateAction<Record<string, Record<number, number>>>) => any
): [boolean, () => void] {
    function toggleFavoriteSong() {
        if (!email) return;
        setFavoriteSongIdsByUser(prev => {
            const _favoriteSongIdsByUser: Record<string, Record<number, number>> = { ...(prev || {}) };
            const _favoriteSongIds: Record<number, number> = { ...(_favoriteSongIdsByUser[email] || {}) };
            if (_favoriteSongIds[id]) delete _favoriteSongIds[id];
            else _favoriteSongIds[id] = 1;
            return {
                ..._favoriteSongIdsByUser,
                [email]: _favoriteSongIds,
            };
        });
    }
    const isFavorite = email ? Boolean(favoriteSongIdsByUser?.[email]?.[id]) : false;

    return [isFavorite, toggleFavoriteSong];
}