- make sure you can't add movie with empty data (with spaces only);
- don't interact with DOM directly, use React as much as possible;
- make sure you described objects in propTypes;
- don't use `isLoad`, it can be `isLoading` or `isLoaded`;
- remove unused comments;
- don't generate key on render ([here](https://medium.com/blackrock-engineering/5-common-mistakes-with-keys-in-react-b86e82020052) is why)
- follow [these](https://medium.com/javascript-in-plain-english/handy-naming-conventions-for-event-handler-functions-props-in-react-fc1cbb791364) naming conventions for methods
- check out what can go wrong if you pass initialize your state with props ([here](https://stackoverflow.com/a/50403930), [here](https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state) and [here](https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state))
- \* don't use setState several times in one function call (method) (it's better for clarity of the code);
- \* use [classnames library](https://www.npmjs.com/package/classnames) for defining classes conditionally;
- \* use `try {..} catch` for error handling

\* - optional recommendation
