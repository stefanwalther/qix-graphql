
### Work with the global scope

Open the GraphiQl UI: http://localhost:3004/global/graphql

Get the list of docs (apps):

```
{
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

Retrieve a single doc + links:

```
{
  doc(qDocId: "/docs/Consumer Goods Example.qvf") {
    qDocId
    _links {
      _doc
    }
  }
}
```

Copy the link of _links/_docs to connect to a single app (e.g. [http://localhost:3004/app/%2Fdocs%2FConsumer%20Goods%20Example.qvf/graphql](http://localhost:3004/app/%2Fdocs%2FConsumer%20Goods%20Example.qvf/graphql):


### Work with the app scope



Copying the value of the attribute `_links/_doc`, will give you the link to open another GraphiQl instance, *connecting to this single app*: 

This then allows you to get e.g. all content of a single table.

**Example:**

- Connect to `http://localhost:3004/app/%2Fdocs%2FConsumer%20Goods%20Example.qvf/graphql`
- Then execute the following query to get all data from the `AddressDetails` table:

```
{
  AddressDetails {
    Address_Number
    State
    Customer_Address_1
    Customer_Address_2
    Customer_Address_3
    Customer_Address_4
    Zip_Code
    City
    Country
    QlikPoint
    K
  }
}
```