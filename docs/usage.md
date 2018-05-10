
Spin up the demo-environment using

```
$ docker-compose up
```

### Work with the environment scope

Open the GraphiQl UI: http://localhost:3004/env/graphql

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

### Work with the app scope

If you get the meta data above from the entire environment and execute the following

```
{
  docs {
    qDocName
    qDocId
    qTitle
    _links {
      _doc
    }
  }
}
```

You'll see a list similar like this:

```
{
  "data": {
    "docs": [
      {
        "qDocName": "Consumer Goods Example.qvf",
        "qDocId": "/docs/Consumer Goods Example.qvf",
        "qTitle": "Consumer Goods Example",
        "_links": {
          "_doc": "http://localhost:3004/app/%2Fdocs%2FConsumer%20Goods%20Example.qvf/graphiql"
        }
      },
      {
        "qDocName": "Consumer Sales.qvf",
        "qDocId": "/docs/Consumer Sales.qvf",
        "qTitle": "Consumer Sales",
        "_links": {
          "_doc": "http://localhost:3004/app/%2Fdocs%2FConsumer%20Sales.qvf/graphiql"
        }
      }
    ]
  }
}
```

Copying the value of the attribute `_doc`, will give you the link to open another GraphiQl instance, *connecting to this single app*: 

This then allows you to get e.g. all content of a single table.

**Example:**

- Connect to `http://localhost:3004/app/%2Fdocs%2FCRM.qvf/graphiql`
- Then execute the following query to get all data from the "Account" table (`NOTE: RIGHT NOW ONLY WORKS WITH THE CRM.qvf APP` ;-)):

```
{
  account {
    AccountId
    Account_Rep_Name
    Account_Type
    Account_Billing_Street
    Account_Billing_City
    Account_Billing_State
    Account_Billing_Zip
    Account_Billing_Country
    Account_Industry
  }
}
```