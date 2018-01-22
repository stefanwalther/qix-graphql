
Open graphiQl: http://localhost:3004/graphiql

Get the list of docs:

```
query getDocs {
  docs {
    qDocId
    qDocName
    qConnectedUsers
    qFileTime
    qFileSize
    qConnectedUsers
  }
}
```

Retrieve a single doc:

```
query getDoc {
  doc(qDocId: "/docs/Consumer Goods Example.qvf") {
    qDocId
  }
}
```

Retrieve the fields of a doc:
```
query getDocFields {
  docfields(qDocId: "/docs/Consumer Goods Example.qvf") {
    qtr {
      qName
    }
  }
}
```