import { State, StateSetters } from './State';

export interface InitialContext {
  state: State;
  methods: StateSetters;
}
