export type Action =
  | { type: "clear" }
  | { type: "error_reset" }
  | { type: "empty_name" }
  | { type: "empty_email" }
  | { type: "empty_body" }
  | { type: "comment_added" }
  | { type: "isLoading"; loading: boolean }
  | { type: "changed_name"; name: string }
  | { type: "changed_email"; email: string }
  | { type: "changed_body"; body: string };
