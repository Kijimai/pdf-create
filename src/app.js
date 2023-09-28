const PORT = process.env.PORT || 5000
const path = require("path")
const express = require("express")
const app = express()
const cors = require("cors")
const ejs = require("ejs")
const fs = require("fs")
const pdf = require("html-pdf")

const options = {
  format: "Letter",
}

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.json())
app.use(express.urlencoded({ extended: true, type: "multipart/form-data" }))
app.use(cors())
app.use(express.static(path.join(__dirname, "/public")))

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/create-pdf", (req, res) => {
  res.render("pages/create_pdf")
})

app.get("/pdf-page", (req, res) => {
  ejs.renderFile(
    path.join(__dirname, "./views/pages/pdf_page.ejs"),
    {
      pdfContent: "I AM A CONTENT",
    },
    (err, data) => {
      if (err) {
        res.send(err)
      } else {
        let options = {
          pdfData: "I AM A CONTENT LOL",
        }

        pdf.create(data, options).toFile("myPdf.pdf", function (err, data) {
          if (err) {
            res.send(err)
          } else {
            res.send("file created successfully")
          }
        })
      }
    }
  )
})

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}.`)
})
