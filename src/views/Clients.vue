<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Clients
        <small>advanced tables</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#"> <i class="fa fa-dashboard"></i> Home </a>
        </li>
        <li>
          <a href="#">Tables</a>
        </li>
        <li class="active">Clients</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Clients</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Trident</td>
                    <td>Internet Explorer 4.0</td>
                    <td>Win 95+</td>
                    <td>4</td>
                    <td>X</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->

          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Data Table With Full Features</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Trident</td>
                    <td>Internet Explorer 4.0</td>
                    <td>Win 95+</td>
                    <td>4</td>
                    <td>X</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    async loadData() {
      const data = await axios.get(
        "http://dummy.restapiexample.com/api/v1/employees"
      );
      console.log("data", data.data);
    }
  },
  mounted() {
    $(function() {
      $("#example1").DataTable();
      $("#example2").DataTable({
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false
      });
    });
    this.loadData();
    // fetch("http://dummy.restapiexample.com/api/v1/employees")
    // .then((response) => { console.log("response",response); return response.json() })
    // .then((data) => {
    //   // self.items = data
    //   console.log("data",data)
    // }).catch( error => { console.log("error",error); });

    // axios
    //   .get("http://dummy.restapiexample.com/api/v1/employees")
    //   .then(function(response) {
    //     // handle success
    //     console.log("response", response.data);
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log("error", error);
    //   })
    //   .finally(function() {
    //     // always executed
    //   });
  }
};
</script>
