$(document).ready(function () {
  $("#load_data").click(function () {
    $.ajax({
      url: "jeczmien_jary.csv",
      dataType: "text",
      success: function (data) {
        let employee_data = data.split(/\r?\n|\r/);
        let table_data = '<table class="">';
        for (let count = 0; count < employee_data.length; count++) {
          let cell_data = employee_data[count].split(";");
          table_data += "<tr>";
          for (
            let cell_count = 0;
            cell_count < cell_data.length;
            cell_count++
          ) {
            table_data += "<td>" + cell_data[cell_count] + "</td>";
          }
          table_data += "</tr>";
        }
        table_data += "</table>";
        $("#employee_table").html(table_data);
      },
    });
  });
});
