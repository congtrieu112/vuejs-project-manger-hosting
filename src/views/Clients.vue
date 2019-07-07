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
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>fullname</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>description</th>
                    <th>birday</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                  <tr>
                    <th>fullname</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>description</th>
                    <th>birday</th>
                    <th>status</th>
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
import { API } from "@/const/constants";
export default {
  methods: {
    async loadData() {
      const data = await axios.get(API.HOST + "/clients");
      console.log("data", data.data);
    }
  },
  mounted() {
    $(function() {
      $("#example1").DataTable({
        responsive: true,
        aLengthMenu: [
          [10, 20, 50, 100, 200, 1000000],
          [10, 20, 50, 100, 200, "All"]
        ],
        iDisplayLength: 10,
        processing: true,
        serverSide: true,
        stateSave: true,
        lengthChange: true,
        searching: false,
        paging: true,
        ajax: {
          url: `${API.HOST}/clients`,
          type: "GET",
          data: function(param) {
            const mappingColumnName = [
              "fullname",
              "email",
              "phone",
              "description",
              "birthday",
              "status"
            ];
            param.orderName = mappingColumnName[param.order[0].column];
            param.orderStatus = param.order[0].dir;
          },
          dataSrc: function(json) {
            return json.data;
          }
        },
        rowId: "id",
        columns: [
          { data: "fullname" },
          { data: "email" },
          { data: "phone" },
          { data: "description" },
          { data: "birthday" },
          { data: "status" }
        ]
      });
    });

    // this.loadData();
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
