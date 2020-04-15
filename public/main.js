var xhttp = new XMLHttpRequest()
  
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText)
    console.log(data)

    var ul = document.createElement('ul')
    ul.setAttribute('class', 'imc')

    data.forEach(function(dados){
      var li = document.createElement('li')
      

      let imc = dados.peso/(dados.altura/100*dados.altura/100)
      ul.appendChild(li);
      li.appendChild(document.createTextNode("Peso: " + dados.peso + " Altura: " + dados.altura + " IMC: " + imc))
    })

    document.getElementById("imc").appendChild(ul)
  }
}

xhttp.open("GET", "/data.json", true)
xhttp.send()