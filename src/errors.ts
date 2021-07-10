export interface DropboxReadsError {
  message?: string;
  error?: any;
}

export class ActionNotFound implements DropboxReadsError {
  readonly message?: string = "Action not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class AuthorNotFound implements DropboxReadsError {
  readonly message?: string = "Author not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class BookNotFound implements DropboxReadsError {
  readonly message?: string = "Book not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class BookshelfNotFound implements DropboxReadsError {
  readonly message?: string = "Bookshelf not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class BookTagNotFound implements DropboxReadsError {
  readonly message?: string = "BookTag not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class BookTagUpvoteNotFound implements DropboxReadsError {
  readonly message?: string = "BookTagUpvote not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class ReactionNotFound implements DropboxReadsError {
  readonly message?: string = "Reaction not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class ReviewReactionNotFound implements DropboxReadsError {
  readonly message?: string = "ReviewReaction not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class ReviewNotFound implements DropboxReadsError {
  readonly message?: string = "Review not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class ReviewUpvoteNotFound implements DropboxReadsError {
  readonly message?: string = "ReviewUpvote not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class RoleNotFound implements DropboxReadsError {
  readonly message?: string = "Role not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class TagNotFound implements DropboxReadsError {
  readonly message?: string = "Tag not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class UserNotFound implements DropboxReadsError {
  readonly message?: string = "User not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class CommentNotFound implements DropboxReadsError {
  readonly message?: string = "Comment not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class CommentReactionNotFound implements DropboxReadsError {
  readonly message?: string = "Comment reaction not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}

export class CommentUpvoteNotFound implements DropboxReadsError {
  readonly message?: string = "Comment upvote not found";
  readonly error?: any;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}
