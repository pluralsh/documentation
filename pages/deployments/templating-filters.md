# Supported Liquid Filters

##  abbrev




_Implementation_: github.com/Masterminds/sprig/v3.abbrev

##  abbrevboth




_Implementation_: github.com/Masterminds/sprig/v3.abbrevboth

##  add
Sums numbers. Accepts two or more inputs. `add 1 2 3` will return `6`.



_Implementation_: github.com/Masterminds/sprig/v3.init.func15

##  add1
Increments by 1. `add1 3` will return `4`.



_Implementation_: github.com/Masterminds/sprig/v3.init.func14

##  add1f
Increments float number by 1.



_Implementation_: github.com/Masterminds/sprig/v3.init.func21

##  addf
Sums float numbers.



_Implementation_: github.com/Masterminds/sprig/v3.init.func22

##  adler32sum
Receives a string and computes its Adler-32 checksum.



_Implementation_: github.com/Masterminds/sprig/v3.adler32sum

##  ago
Returns duration from current time in seconds resolution.



_Implementation_: github.com/Masterminds/sprig/v3.dateAgo

##  all
Takes a list of values ad returns true if all values are non-empty.



_Implementation_: github.com/Masterminds/sprig/v3.all

##  any
Takes a list of values ad returns true if any values are non-empty.



_Implementation_: github.com/Masterminds/sprig/v3.any

##  append
Appends a new item to existing list, creating a new list.



_Implementation_: github.com/Masterminds/sprig/v3.push

##  atoi
Converts a string to an integer.



_Implementation_: github.com/Masterminds/sprig/v3.init.func12

##  b32dec
Decodes string from Base32 format.



_Implementation_: github.com/Masterminds/sprig/v3.base32decode

##  b32enc
Encodes string with Base32 format.



_Implementation_: github.com/Masterminds/sprig/v3.base32encode

##  b64dec
Decodes string from Base64 format.



_Implementation_: github.com/Masterminds/sprig/v3.base64decode

##  b64enc
Encodes string with Base64 format.



_Implementation_: github.com/Masterminds/sprig/v3.base64encode

##  base




_Implementation_: path.Base

##  bcrypt
Receives a string and generates its bcrypt hash.



_Implementation_: github.com/Masterminds/sprig/v3.bcrypt

##  biggest




_Implementation_: github.com/Masterminds/sprig/v3.max

##  buildCustomCert
Allows customizing the certificate. It takes Base64 encoded PEM format certificate and private key as arguments and returns object with PEM-encoded certificate and key. Note that the returned object can be passed to the `genSignedCert` function to sign a certificate using this CA.



_Implementation_: github.com/Masterminds/sprig/v3.buildCustomCertificate

##  camelcase




_Implementation_: github.com/huandu/xstrings.ToPascalCase

##  cat




_Implementation_: github.com/Masterminds/sprig/v3.cat

##  ceil
Returns greatest float value greater than or equal to input value. `ceil 123.001` will return `124.0`.



_Implementation_: github.com/Masterminds/sprig/v3.ceil

##  chunk




_Implementation_: github.com/Masterminds/sprig/v3.chunk

##  clean




_Implementation_: path.Clean

##  coalesce




_Implementation_: github.com/Masterminds/sprig/v3.coalesce

##  compact
Accepts a list and removes entries with empty values.



_Implementation_: github.com/Masterminds/sprig/v3.compact

##  concat
Concatenates arbitrary number of lists into one.



_Implementation_: github.com/Masterminds/sprig/v3.concat

##  contains
Tests if one string is contained inside of another. `contains "cat" "catch"` will return `true`.



_Implementation_: github.com/Masterminds/sprig/v3.init.func9

##  date
Formats date.



_Implementation_: github.com/Masterminds/sprig/v3.date

##  dateInZone
Same as `date` but with a timezone.



_Implementation_: github.com/Masterminds/sprig/v3.dateInZone

##  dateModify




_Implementation_: github.com/Masterminds/sprig/v3.dateModify

##  date_in_zone




_Implementation_: github.com/Masterminds/sprig/v3.dateInZone

##  date_modify




_Implementation_: github.com/Masterminds/sprig/v3.dateModify

##  decryptAES
Receives a Base64 string encoded by the AES-256 CBC algorithm and returns the decoded text.



_Implementation_: github.com/Masterminds/sprig/v3.decryptAES

##  deepCopy




_Implementation_: github.com/Masterminds/sprig/v3.deepCopy

##  deepEqual




_Implementation_: reflect.DeepEqual

##  default




_Implementation_: github.com/pluralsh/polly/template.dfault

##  derivePassword




_Implementation_: github.com/Masterminds/sprig/v3.derivePassword

##  dict




_Implementation_: github.com/Masterminds/sprig/v3.dict

##  dig




_Implementation_: github.com/Masterminds/sprig/v3.dig

##  dir




_Implementation_: path.Dir

##  div
Performs integer division.



_Implementation_: github.com/Masterminds/sprig/v3.init.func17

##  divf




_Implementation_: github.com/Masterminds/sprig/v3.init.func24

##  duration
Formats a given amount of seconds as a `time.Duration`.



_Implementation_: github.com/Masterminds/sprig/v3.duration

##  durationRound




_Implementation_: github.com/Masterminds/sprig/v3.durationRound

##  empty




_Implementation_: github.com/Masterminds/sprig/v3.empty

##  encryptAES
Encrypts text with AES-256 CBC and returns a Base64 encoded string.



_Implementation_: github.com/Masterminds/sprig/v3.encryptAES

##  env
Reads environment variable.



_Implementation_: os.Getenv

##  expandenv
Substitutes environment variable in a string.



_Implementation_: os.ExpandEnv

##  ext
Returns file extension. `ext "foo.bar"` will return `"bar"`.



_Implementation_: path.Ext

##  fail
Unconditionally returns an empty string and an error with the specified text. This is useful in scenarios where other conditionals have determined that template rendering should fail.



_Implementation_: github.com/Masterminds/sprig/v3.init.func26

##  first
Returns head item on a list.



_Implementation_: github.com/Masterminds/sprig/v3.first

##  float64
Converts to a `float64`.



_Implementation_: github.com/Masterminds/sprig/v3.toFloat64

##  floor
Returns the greatest float value greater than or equal to input value. `floor 123.9999` will return `123.0`.



_Implementation_: github.com/Masterminds/sprig/v3.floor

##  fromJson


_Aliases_: from_json

_Implementation_: github.com/Masterminds/sprig/v3.fromJson

##  genCA
Generates a new, self-signed x509 SSL Certificate Authority using 2048-bit RSA private key. It takes subject common name (CN) and cert validity duration in days as parameters. It returns object with PEM-encoded certificate and key. Note that the returned object can be passed to the `genSignedCert` function to sign a certificate using this CA.



_Implementation_: github.com/Masterminds/sprig/v3.generateCertificateAuthority

##  genCAWithKey
Generates a new, self-signed x509 SSL Certificate Authority using given private key. It takes subject common name (CN), cert validity duration in days and private key (PEM-encoded; DSA keys are not supported) as parameters. It returns object with PEM-encoded certificate and key. Note that the returned object can be passed to the `genSignedCert` function to sign a certificate using this CA.



_Implementation_: github.com/Masterminds/sprig/v3.generateCertificateAuthorityWithPEMKey

##  genPrivateKey




_Implementation_: github.com/Masterminds/sprig/v3.generatePrivateKey

##  genSelfSignedCert
Generates an SSL self-signed certificate.



_Implementation_: github.com/Masterminds/sprig/v3.generateSelfSignedCertificate

##  genSelfSignedCertWithKey




_Implementation_: github.com/Masterminds/sprig/v3.generateSelfSignedCertificateWithPEMKey

##  genSignedCert
Generates an SSL certificate and key based on a given CA.



_Implementation_: github.com/Masterminds/sprig/v3.generateSignedCertificate

##  genSignedCertWithKey




_Implementation_: github.com/Masterminds/sprig/v3.generateSignedCertificateWithPEMKey

##  get




_Implementation_: github.com/Masterminds/sprig/v3.get

##  getHostByName




_Implementation_: github.com/Masterminds/sprig/v3.getHostByName

##  has
Checks if a list has a particular element.



_Implementation_: github.com/Masterminds/sprig/v3.has

##  hasKey




_Implementation_: github.com/Masterminds/sprig/v3.hasKey

##  hasPrefix




_Implementation_: github.com/Masterminds/sprig/v3.init.func10

##  hasSuffix




_Implementation_: github.com/Masterminds/sprig/v3.init.func11

##  htmlDate
Formats a date for inserting into HTML date picker input field.



_Implementation_: github.com/Masterminds/sprig/v3.htmlDate

##  htmlDateInZone
Same as `htmlDate` but with a timezone.



_Implementation_: github.com/Masterminds/sprig/v3.htmlDateInZone

##  htpasswd




_Implementation_: github.com/Masterminds/sprig/v3.htpasswd

##  indent




_Implementation_: github.com/pluralsh/polly/template.indent

##  initial
Compliments `last` by retuning all but the last element.



_Implementation_: github.com/Masterminds/sprig/v3.initial

##  initials




_Implementation_: github.com/Masterminds/sprig/v3.initials

##  int
Converts to a `int`.



_Implementation_: github.com/Masterminds/sprig/v3.toInt

##  int64
Converts to a `int64`.



_Implementation_: github.com/Masterminds/sprig/v3.toInt64

##  isAbs
Checks whether a path is absolute.



_Implementation_: path.IsAbs

##  join




_Implementation_: github.com/Masterminds/sprig/v3.join

##  kebabcase




_Implementation_: github.com/huandu/xstrings.ToKebabCase

##  keys




_Implementation_: github.com/Masterminds/sprig/v3.keys

##  kindIs




_Implementation_: github.com/Masterminds/sprig/v3.kindIs

##  kindOf




_Implementation_: github.com/Masterminds/sprig/v3.kindOf

##  last




_Implementation_: github.com/Masterminds/sprig/v3.last

##  list




_Implementation_: github.com/Masterminds/sprig/v3.list

##  lower
Converts the entire string to lowercase. `upper "HELLO"` will return `hello`.



_Implementation_: strings.ToLower

##  max
Returns the largest of a series of integers. `max 1 2 3` will return `3`.



_Implementation_: github.com/Masterminds/sprig/v3.max

##  maxf




_Implementation_: github.com/Masterminds/sprig/v3.maxf

##  merge




_Implementation_: github.com/Masterminds/sprig/v3.merge

##  mergeOverwrite




_Implementation_: github.com/Masterminds/sprig/v3.mergeOverwrite

##  min
Returns the smallest of a series of integers. `min 1 2 3` will return `1`.



_Implementation_: github.com/Masterminds/sprig/v3.min

##  minf




_Implementation_: github.com/Masterminds/sprig/v3.minf

##  mod




_Implementation_: github.com/Masterminds/sprig/v3.init.func18

##  mul
Multiples numbers. Accepts two or more inputs. `mul 1 2 3` will return `6`.



_Implementation_: github.com/Masterminds/sprig/v3.init.func19

##  mulf




_Implementation_: github.com/Masterminds/sprig/v3.init.func25

##  mustAppend
Appends a new item to existing list, creating a new list. Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustPush

##  mustChunk




_Implementation_: github.com/Masterminds/sprig/v3.mustChunk

##  mustCompact
Accepts a list and removes entries with empty values. Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustCompact

##  mustDateModify




_Implementation_: github.com/Masterminds/sprig/v3.mustDateModify

##  mustDeepCopy




_Implementation_: github.com/Masterminds/sprig/v3.mustDeepCopy

##  mustFirst
Returns head item on a list. Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustFirst

##  mustFromJson




_Implementation_: github.com/Masterminds/sprig/v3.mustFromJson

##  mustHas
Checks if a list has a particular element. Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustHas

##  mustInitial
Compliments `last` by retuning all but the last element. Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustInitial

##  mustLast




_Implementation_: github.com/Masterminds/sprig/v3.mustLast

##  mustMerge




_Implementation_: github.com/Masterminds/sprig/v3.mustMerge

##  mustMergeOverwrite




_Implementation_: github.com/Masterminds/sprig/v3.mustMergeOverwrite

##  mustPrepend




_Implementation_: github.com/Masterminds/sprig/v3.mustPrepend

##  mustPush




_Implementation_: github.com/Masterminds/sprig/v3.mustPush

##  mustRegexFind




_Implementation_: github.com/Masterminds/sprig/v3.mustRegexFind

##  mustRegexFindAll




_Implementation_: github.com/Masterminds/sprig/v3.mustRegexFindAll

##  mustRegexMatch




_Implementation_: github.com/Masterminds/sprig/v3.mustRegexMatch

##  mustRegexReplaceAll




_Implementation_: github.com/Masterminds/sprig/v3.mustRegexReplaceAll

##  mustRegexReplaceAllLiteral




_Implementation_: github.com/Masterminds/sprig/v3.mustRegexReplaceAllLiteral

##  mustRegexSplit




_Implementation_: github.com/Masterminds/sprig/v3.mustRegexSplit

##  mustRest
Gets tail of the list (everything but the first item). Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustRest

##  mustReverse
Produces a new list with the reversed elements of the given list. Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustReverse

##  mustSlice




_Implementation_: github.com/Masterminds/sprig/v3.mustSlice

##  mustToDate
Converts a string to a date. The first argument is the date layout and the second is the date string. If the string can’t be converted it returns the zero value. Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustToDate

##  mustToJson




_Implementation_: github.com/Masterminds/sprig/v3.mustToJson

##  mustToPrettyJson




_Implementation_: github.com/Masterminds/sprig/v3.mustToPrettyJson

##  mustToRawJson




_Implementation_: github.com/Masterminds/sprig/v3.mustToRawJson

##  mustUniq
Generates a list with all of the duplicates removed. Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustUniq

##  mustWithout
Filters items out of a list. Like other `must` functions instead of panicking when there is a problem it will return an error to the template engine.



_Implementation_: github.com/Masterminds/sprig/v3.mustWithout

##  must_date_modify




_Implementation_: github.com/Masterminds/sprig/v3.mustDateModify

##  nindent




_Implementation_: github.com/pluralsh/polly/template.nindent

##  nospace
Removes all whitespace from a string. `nospace "hello w o r l d"` will return `helloworld`.



_Implementation_: github.com/Masterminds/goutils.DeleteWhiteSpace

##  omit




_Implementation_: github.com/Masterminds/sprig/v3.omit

##  osBase
Returns the last element of a file path. `osBase "/foo/bar/baz"` and `osBase "C:\\foo\\bar\\baz"` will return `"baz"` on Linux and Windows, respectively.



_Implementation_: path/filepath.Base

##  osClean
Cleans up a path. `osClean "/foo/bar/../baz"` and `osClean "C:\\foo\\bar\\..\\baz"` will resolve the `..` and return `foo/baz` on Linux and `C:\foo\baz` on Windows.



_Implementation_: path/filepath.Clean

##  osDir
Returns the directory, stripping the last part of the path. So `osDir "/foo/bar/baz"` returns `/foo/bar` on Linux, and `osDir "C:\\foo\\bar\\baz"` returns `C:\\foo\\bar` on Windows.



_Implementation_: path/filepath.Dir

##  osExt
Return the file extension. `osExt "/foo.bar"` and `osExt "C:\\foo.bar"` will return `.bar` on Linux and Windows, respectively.



_Implementation_: path/filepath.Ext

##  osIsAbs
Checks whether a file path is absolute.



_Implementation_: path/filepath.IsAbs

##  pick




_Implementation_: github.com/Masterminds/sprig/v3.pick

##  pluck




_Implementation_: github.com/Masterminds/sprig/v3.pluck

##  plural




_Implementation_: github.com/Masterminds/sprig/v3.plural

##  prepend




_Implementation_: github.com/Masterminds/sprig/v3.prepend

##  push




_Implementation_: github.com/Masterminds/sprig/v3.push

##  quote




_Implementation_: github.com/Masterminds/sprig/v3.quote

##  randAlpha




_Implementation_: github.com/Masterminds/sprig/v3.randAlpha

##  randAlphaNum




_Implementation_: github.com/Masterminds/sprig/v3.randAlphaNumeric

##  randAscii




_Implementation_: github.com/Masterminds/sprig/v3.randAscii

##  randBytes
Accepts a count `N` and generates cryptographically secure random sequence of `N` bytes. The sequence is returned as a Base64 encoded string.



_Implementation_: github.com/Masterminds/sprig/v3.randBytes

##  randInt
Returns a random integer value from min (inclusive) to max (exclusive). `randInt 12 30` will produce a random number in the range from 12 to 30.



_Implementation_: github.com/Masterminds/sprig/v3.init.func20

##  randNumeric




_Implementation_: github.com/Masterminds/sprig/v3.randNumeric

##  regexFind




_Implementation_: github.com/Masterminds/sprig/v3.regexFind

##  regexFindAll




_Implementation_: github.com/Masterminds/sprig/v3.regexFindAll

##  regexMatch




_Implementation_: github.com/Masterminds/sprig/v3.regexMatch

##  regexQuoteMeta




_Implementation_: github.com/Masterminds/sprig/v3.regexQuoteMeta

##  regexReplaceAll




_Implementation_: github.com/Masterminds/sprig/v3.regexReplaceAll

##  regexReplaceAllLiteral




_Implementation_: github.com/Masterminds/sprig/v3.regexReplaceAllLiteral

##  regexSplit




_Implementation_: github.com/Masterminds/sprig/v3.regexSplit

##  repeat




_Implementation_: github.com/Masterminds/sprig/v3.init.func2

##  replace




_Implementation_: strings.ReplaceAll

##  rest
Gets tail of the list (everything but the first item).



_Implementation_: github.com/Masterminds/sprig/v3.rest

##  reverse
Produces a new list with the reversed elements of the given list.



_Implementation_: github.com/Masterminds/sprig/v3.reverse

##  round
Returns a float value with the remainder rounded to the given number to digits after the decimal point. `round 123.55555 3` will return `123.556`.



_Implementation_: github.com/Masterminds/sprig/v3.round

##  semver




_Implementation_: github.com/Masterminds/sprig/v3.semver

##  semverCompare


_Aliases_: semver_compare

_Implementation_: github.com/Masterminds/sprig/v3.semverCompare

##  seq
Works like Bash `seq` command. Specify 1 parameter (`end`) to generate all counting integers between 1 and `end` inclusive. Specify 2 parameters (`start` and `end`) to generate all counting integers between `start` and `end` inclusive incrementing or decrementing by 1. Specify 3 parameters (`start`, `step` and `end`) to generate all counting integers between `start` and `end` inclusive incrementing or decrementing by `step`.



_Implementation_: github.com/Masterminds/sprig/v3.seq

##  set




_Implementation_: github.com/Masterminds/sprig/v3.set

##  sha1sum




_Implementation_: github.com/Masterminds/sprig/v3.sha1sum

##  sha256sum


_Aliases_: sha26sum

_Implementation_: github.com/Masterminds/sprig/v3.sha256sum

##  sha512sum




_Implementation_: github.com/Masterminds/sprig/v3.sha512sum

##  shuffle




_Implementation_: github.com/huandu/xstrings.Shuffle

##  slice




_Implementation_: github.com/Masterminds/sprig/v3.slice

##  snakecase




_Implementation_: github.com/huandu/xstrings.ToSnakeCase

##  sortAlpha




_Implementation_: github.com/Masterminds/sprig/v3.sortAlpha

##  split




_Implementation_: github.com/Masterminds/sprig/v3.split

##  splitList




_Implementation_: github.com/Masterminds/sprig/v3.init.func13

##  splitn




_Implementation_: github.com/Masterminds/sprig/v3.splitn

##  squote




_Implementation_: github.com/Masterminds/sprig/v3.squote

##  sub




_Implementation_: github.com/Masterminds/sprig/v3.init.func16

##  subf




_Implementation_: github.com/Masterminds/sprig/v3.init.func23

##  substr




_Implementation_: github.com/Masterminds/sprig/v3.substring

##  swapcase




_Implementation_: github.com/Masterminds/goutils.SwapCase

##  ternary
Takes two values and a test value. If the test value is true, the first value will be returned. If the test value is false, the second value will be returned. This is similar to the C ternary operator. `ternary "foo" "bar" true` or `true | "foo" "bar"` will return `"foo"`.



_Implementation_: github.com/pluralsh/polly/template.ternary

##  title
Converts a string to title case. `title "hello world"` will return `"Hello World"`.



_Implementation_: strings.Title

##  toDate
Converts a string to a date. The first argument is the date layout and the second is the date string. If the string can’t be converted it returns the zero value.



_Implementation_: github.com/Masterminds/sprig/v3.toDate

##  toDecimal
Converts a Unix octal to a `int64`.`"0777" | toDecimal` will convert `0777` to `511` and return the value as `int64`.



_Implementation_: github.com/Masterminds/sprig/v3.toDecimal

##  toJson


_Aliases_: to_json

_Implementation_: github.com/Masterminds/sprig/v3.toJson

##  toPrettyJson




_Implementation_: github.com/Masterminds/sprig/v3.toPrettyJson

##  toRawJson
Encodes an item into JSON string with HTML characters unescaped. `toRawJson .Item` will return unescaped JSON string representation of `.Item`.



_Implementation_: github.com/Masterminds/sprig/v3.toRawJson

##  toString
Converts to a string.



_Implementation_: github.com/Masterminds/sprig/v3.strval

##  toStrings
Converts a list, slice or array to a list of strings. `list 1 2 3 | toString` converts `1`, `2` and `3` to strings and then returns them as a list.



_Implementation_: github.com/Masterminds/sprig/v3.strslice

##  trim
Removes space from either side of a string. `trim "  hello  "` will return `hello`.



_Implementation_: strings.TrimSpace

##  trimAll
Removes given characters from the front or back of a string. `trimAll "$" "$5.00"` will return `5.00` (as a string).



_Implementation_: github.com/Masterminds/sprig/v3.init.func4

##  trimPrefix
Trims just the prefix from a string. `trimPrefix "-" "-hello"` will return `hello`.



_Implementation_: github.com/Masterminds/sprig/v3.init.func6

##  trimSuffix
Trims just the suffix from a string. `trimSuffix "-" "hello-"` will return `hello`.



_Implementation_: github.com/Masterminds/sprig/v3.init.func5

##  trimall




_Implementation_: github.com/Masterminds/sprig/v3.init.func3

##  trunc




_Implementation_: github.com/Masterminds/sprig/v3.trunc

##  tuple




_Implementation_: github.com/Masterminds/sprig/v3.list

##  typeIs




_Implementation_: github.com/Masterminds/sprig/v3.typeIs

##  typeIsLike




_Implementation_: github.com/Masterminds/sprig/v3.typeIsLike

##  typeOf




_Implementation_: github.com/Masterminds/sprig/v3.typeOf

##  uniq
Generates a list with all of the duplicates removed.



_Implementation_: github.com/Masterminds/sprig/v3.uniq

##  unixEpoch
Returns the seconds since the Unix epoch.



_Implementation_: github.com/Masterminds/sprig/v3.unixEpoch

##  unset
Given a map and a key it deletes the key from the map. It returns dictionary. Note that if the key is not found this operation will simply return. No error will be generated.



_Implementation_: github.com/Masterminds/sprig/v3.unset

##  until
Builds a range of integers. `until 5` will return a list `[0, 1, 2, 3, 4]`.



_Implementation_: github.com/Masterminds/sprig/v3.until

##  untilStep
Like `until` generates a list of counting integers but it allows to define a start, stop and step. `untilStep 3 6 2` will return `[3, 5]` by starting with 3 and adding 2 until it is equal or greater than 6.



_Implementation_: github.com/Masterminds/sprig/v3.untilStep

##  untitle
Removes title casing. `untitle "Hello World"` will return `"hello world"`.



_Implementation_: github.com/Masterminds/sprig/v3.untitle

##  upper
Converts the entire string to uppercase. `upper "hello"` will return `HELLO`.



_Implementation_: strings.ToUpper

##  urlJoin
Joins map produced by `urlParse` to produce URL string. `urlJoin (dict "fragment" "fragment" "host" "host:80" "path" "/path" "query" "query" "scheme" "http")` will return `proto://host:80/path?query#fragment`.



_Implementation_: github.com/Masterminds/sprig/v3.urlJoin

##  urlParse
Parses string for URL and produces dict with URL parts. For more info check https://golang.org/pkg/net/url/#URL.



_Implementation_: github.com/Masterminds/sprig/v3.urlParse

##  values




_Implementation_: github.com/Masterminds/sprig/v3.values

##  without
Filters items out of a list. It can take more than one filter.



_Implementation_: github.com/Masterminds/sprig/v3.without

##  wrap
Wraps text at a given column count. `wrap 80 $text` will wrap the string in `$text` at 80 columns.



_Implementation_: github.com/Masterminds/sprig/v3.init.func7

##  wrapWith
Works as `wrap` but lets you specify the string to wrap with (`wrap` uses `\n`). `wrapWith 5 "\t" "Hello world"` will return `hello world` (where the whitespace is an ASCII tab character).



_Implementation_: github.com/Masterminds/sprig/v3.init.func8
