export type BookAction = 'GET_BOOKS' | 'GET_BOOK' | 'COUNT_BOOK';
export type AuthorAction = 'GET_AUTHORS' | 'GET_AUTHOR' | 'COUNT_AUTHOR';

export type RequestAction = BookAction | AuthorAction;
