# Norwegian birth number validator

This small library validates norwegian birth numbers ([fødselsnummer](https://no.wikipedia.org/wiki/F%C3%B8dselsnummer)).

## Usage

```JS
import validate from "birth-number-validator"

validate("98765432109")
// => false

validate("01010100050")
// => true
```

## Tests

To run the tests:

```sh
npm test
```
