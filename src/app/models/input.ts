export interface IInput {
  name: string;
  type: 'text' | 'password' | 'email';
  label: string;
  class?: string;
}
