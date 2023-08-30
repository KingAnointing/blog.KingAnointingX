---
slug: newdecoder-vs-unmarshal-function-in-go
title: NewDecoder Vs Unmarshal Function In Go (The Subtle Difference)
author: Adetoye Anointing 王
author_title: Backend Engineer
author_url: https://www.linkedin.com/in/adetoye-anointing-155270235
tags: [ go, golang, json ]
---

Working as a golang engineer with JSON data and API is fun until you have to choose between which method to **serialize** and **deserialize** your data with within the program.
This is about the subtle difference between the functions in the "**encoding/json**" package in golang for deserialization of json response body.
Are you curious about the difference in the provided methods by the golang library **json**

<!--truncate -->
#### Prerequiste
The golang library provides a package "**encoding/json**" that handles json data excellently with it builtin methods
    - NewEncoder and NewDecoder
    - Marshal and Unmarshal

these concept are often used interchangeably to refer to thesame process, the distinction is refined and closely related which makes choosing the suitable one for our program usually influenced by personal preferences and usecases.

The unnoticeable difference in relation between these methods is what will be discussed in this article but first let us look at the most basic way of integrating an API with JSON response in golang and logging the data in the terminal. 👇👇👇

<!-- - go -->
```go
package main

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"os"
)

type CatFact struct {
	Fact   string
	Length string
}

func main() {
	var catFact CatFact
	// create a logger type
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	logger.Info("Hello Terminal From Your Favourite Neighbourhood Backend Engineer")

	// create an http client
	client := http.DefaultClient

	resp, err := client.Get("https://catfact.ninja/fact")
	// check for error
	if err != nil {
		logger.Error("response error from getting a cat fact")
        return
	}

	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	logger.Info(string(body), "user", os.Getenv("USER"))
}
```
Terminal ::
```bash
↪️ go run main.go

↪️ time=2023-08-30T09:26:33.042+01:00 level=INFO msg="{\"fact\":\"Cats have 32 muscles that control the outer ear (humans have only 6). A cat can independently rotate its ears 180 degrees.\",\"length\":122}" user=hankami

```

***NOTE** => The response from the cat fast API is in a JSON which makes it a good candidate for this article examples. 
For a start, we will be looking into the unmarshalling of data using both method function.

The concept of unmarshalling or decoding json reponse in go is a low level deserialization of json data often from an external API intergrated into predefined matching data structure in golang.

The major difference difference between the **"Json.NewDecoder()"**" and **"json.Unmarshal()"** is how they read the data and deserialize it into the data structure.

* **Memory Efficiency** : The **"json.NewDecoder()"** provides a data streaming method, reading all data as it being sent and deserialize into the data structure without any additional space and time, basically a O(n) making it a credible solution for memory effiency, especially working with large response data while the **"json.Marshall()"** requires the data from the response body to be read in a byte format in memory using an extra funtion **"io.ReadAll()"** and then passes into it for deserialization requiring addition space and time with a O(n2) which can be a problem if the response body is large slowing down the program process.

* **Error Handling And Code Complexity** : The **"json.NewDecoder()"** approach of streaming mechanism makes error handling straightforward and the code simplified by handling error gracefully while streaming json response body which is a minimal and efficient approach in large applications while **"json.Marshall()"** on the other hand requires handling error on both it end and the **"io.ReadAll()"** part for it to align with best golang error handling practice and unfortunately half of the world just do the **_** on io.ReadAll() and move on with there 9-5 😃

* **Streaming Decoding** : lastly, streaming decoding; reading from the top will have provide a certain level to the aspect, so I will be concise and brief, **"json.NewDecoder()"** streaming fashion is a more efficient way of handling large amount of response compare to **"json.Marshall()"** that needs extra space for it to read and write.

### BRIEF CODE SAMPLES

####  USING THE **json.Unmarsal()** FUNCTION

```go
// read response body
body, err := io.ReadAll(resp.Body)
if err != nil {
	logger.Error("error occured while reading response body data into variable", "error", err.Error())
	return
}

if err := json.Unmarshal(body, &catFact); err != nil {
	logger.Error("error occured while marshalling data into catFact struct", "error", err.Error())
	return
}
```
This code sample above displays the read and write mechanism used by the Unmarshal function in go also handling a two way error

=> Full code For **json.Unmarsal()**
```go
package main

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"os"
)

type CatFact struct {
	Fact   string `json:"fact"`
	Length int    `json:"length"`
}

func main() {
	var catFact CatFact
	// create a logger type
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	logger.Info("Hello Terminal From Your Favourite Neighbourhood Backend Engineer")

	// create an http client
	client := http.DefaultClient

	resp, err := client.Get("https://catfact.ninja/fact")
	// check for error
	if err != nil {
		logger.Error("response error from getting a cat fact")
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		logger.Error("error occured while reading response body data into variable", "error", err.Error())
		return
	}

	if err := json.Unmarshal(body, &catFact); err != nil {
		logger.Error("error occured while marshalling json data into catFact struct", "error", err.Error())
		return
	}

	logger.Info(catFact.Fact, "Fact length", catFact.Length)
}
```

####  USING THE **json.NewDecoder()** FUNCTION
```go
if err := json.NewDecoder(resp.Body).Decode(&catFact); err != nil {
	logger.Error("error occured while decoding json data into catFact struct", "error", err.Error())
	return
}
```
The code sample above displays how brief and simply using the NewDecoder function serialize and handle error from request response body

=> Full code for **json.NewDecoder()**
```go
package main

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"os"
)

type CatFact struct {
	Fact   string `json:"fact"`
	Length int    `json:"length"`
}

func main() {
	var catFact CatFact
	// create a logger type
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	logger.Info("Hello Terminal From Your Favourite Neighbourhood Backend Engineer")

	// create an http client
	client := http.DefaultClient

	resp, err := client.Get("https://catfact.ninja/fact")
	// check for error
	if err != nil {
		logger.Error("response error from getting a cat fact")
	}

    // streaming and decodig the json data while handling error
	defer resp.Body.Close()
	if err := json.NewDecoder(resp.Body).Decode(&catFact); err != nil {
		logger.Error("error occured while decoding json data into catFact struct", "error", err.Error())
		return
	}

	logger.Info(catFact.Fact, "Fact length", catFact.Length)
}

```

Terminal Response sample for Both Code
```bash
↪️ go run main.go

↪️ time=2023-08-30T11:18:42.520+01:00 level=INFO msg="Hello Terminal From Your Favourite Neighbourhood Backend Engineer"
↪️ time=2023-08-30T11:18:51.046+01:00 level=INFO msg="Cats have 300 million neurons; dogs have about 160 million" "Fact length"=58
```

**! they perform the same task and gives thesame output; they are only done in a different way, hence thesame response**

#### => Conclusion
*The use of both function is distinct and depends on the use case and personal preference of the software developer. Both offers different perks and are closely related with a subtle difference that might not be noticable in a simple program.
my personal advice is use the **NewDecoder**  function while working with large response body and have fun with anyone while working with little data body*

#### => Link to Code On Github
- (go-json)[https://github.com/KingDaemonX/go-json]
<br/>
<h2>Comments</h2>
<Giscus
id="comments"
repo="KingDaemonX/blog.KingAnointingX"
repoId="MDEwOlJlcG9zaXRvcnkzOTE0MzQyOTI="
category="General"
categoryId="DIC_kwDOF1TQNM4CQ8lN"
mapping="title"
term="Comments"
reactionsEnabled="1"
emitMetadata="0"
inputPosition="top"
theme="preferred_color_scheme"
lang="en"
loading="lazy"
crossorigin="anonymous"
    />
