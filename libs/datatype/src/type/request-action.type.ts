export type BookAction = 'GET_BOOKS' | 'GET_BOOK' | 'COUNT_BOOK' | 'GET_BOOKS_BY_AUTHOR';
export type AuthorAction = 'GET_AUTHORS' | 'GET_AUTHOR' | 'COUNT_AUTHOR';
export type TagAction = 'COUNT_TAG';
export type LibraryAction = 'STATISTICS';

export type RequestAction = BookAction | AuthorAction | TagAction | LibraryAction;
