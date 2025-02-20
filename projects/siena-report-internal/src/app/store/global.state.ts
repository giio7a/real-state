export interface GlobalState {
  /**
   * The JWT token used to authenticate the user.
   */
  authToken: string | undefined;
}

export const initialState: GlobalState = {
  authToken: undefined,
};
