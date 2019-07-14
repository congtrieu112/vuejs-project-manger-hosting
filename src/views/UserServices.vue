<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        User Services
        <small>advanced tables</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#">
            <i class="fa fa-dashboard"></i> Home
          </a>
        </li>
        <li>
          <a href="#">Tables</a>
        </li>
        <li class="active">User Services</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">User Services</h3>
              <button class="btn btn-success btn-sm btn-add-item ml-20">Add New</button>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>dateRegister</th>
                    <th>dateExpires</th>
                    <th>dateRemind</th>
                    <th>description</th>
                    <th>services</th>
                    <th>clients</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                  <tr>
                    <th>name</th>
                    <th>dateRegister</th>
                    <th>dateExpires</th>
                    <th>dateRemind</th>
                    <th>description</th>
                    <th>services</th>
                    <th>clients</th>
                    <th>status</th>
                    <th>Action</th>
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
    <!-- MODAL EDIT USER -->
     <!-- "name",
            "dateRegister",
            "dateExpires",
            "description",
            "services",
            "clients",
            "status" -->
    <div class="modal fade" id="model-edit-or-add-data">
      <div class="modal-dialog">
        <div class="modal-content">
          <form id="add-or-update-form" role="form" autocomplete="off">
            <div class="modal-header">
              <button
                type="button"
                class="close close-modal-btn"
                data-dismiss="modal"
                aria-hidden="true"
              >&times;</button>
              <h4 class="modal-title">User Services</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="name"
                  required="required"
                />
              </div>
              <div class="form-group">
                <label for="dateRegister">dateRegister</label>
                <input
                  type="text"
                  name="dateRegister"
                  class="form-control"
                  placeholder="yyyy-mm-dd"
                  required="required"
                />
              </div>
              <div class="form-group">
                <label for="dateExpires">dateExpires</label>
                <input
                  type="text"
                  name="dateExpires"
                  class="form-control"
                  placeholder="yyyy-mm-dd"
                  required="required"
                />
              </div>
              <div class="form-group">
                <label for="dateRemind">dateRemind</label>
                <input
                  type="text"
                  name="dateRemind"
                  class="form-control"
                  placeholder="yyyy-mm-dd"
                  required="required"
                />
              </div>
              
              <div class="form-group">
                <label for="textpassword">clients</label>
                <select
                  id="textclients"
                  class="form-control select2"
                  name="clients"
                  required="required"
                >

                </select>
              </div>
              <div class="form-group">
                <label for="textservices">services</label>
                <select
                  name="services"
                  id="textservices"
                  class="form-control select2"
                  placeholder="services"
                  required="required"
                >
                </select>
              </div>

              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  name="description"
                  class="form-control"
                  placeholder="content"
                  required="required"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="status">Status</label>
                <select name="status" class="form-control select2" required="required">
                  <option value="1">Active</option>
                  <option value="2">Disable</option>
                </select>
              </div>
              <input type="hidden" name="id" />
              
              
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default close-modal-btn"
                data-dismiss="modal"
              >Close</button>
              <button type="submit" class="btn btn-primary">Save or create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import $ from "jquery";
import { API } from "@/const/constants";
import Services from "@/api";
import Swal from "sweetalert2";
import moment from "moment";
export default {
  data: function() {
    return {
      table: "",
      modalEl: "",
      error:true,
      dataClients:'',
      dataServices:''
    };
  },
  methods: {
    async loadDataClients() {
       const nClients = await axios.get(API.HOST + "/clients?start=0&length=100000000&orderName=username&orderStatus=asc");
       let result = '';
      if(nClients.data.data) {
        // Do something
          nClients.data.data.map(function(value, key) {
            result += `<option value="${value.id}">${value.fullname}-${value.email}</option>`;
          });
        
      }
      return result;
    },
    async loadDataServices() {
       const nServices = await axios.get(API.HOST + "/services?start=0&length=100000000&orderName=name&orderStatus=asc");
       let result = '';
      if(nServices.data.data) {
        // Do something
          nServices.data.data.map(function(value, key) {
            result += `<option value="${value.id}">${value.name}</option>`;
          });
        
      }
      return result;
    },
    onClick(e) {
      this.error = false;
      console.log("this.error",this.error);
      console.log("e",e);
    },
    handleSubmit: async function(e) {
      // this.$refs.form.submit()
      console.log("this.error",e);
      if (e.detail.error===false) {
        const form = $("#add-or-update-form");
        let dataValue = form.serialize() ;
        const button = form.find("button[type=submit]").button("loading");
        const result = await Services.createOrApi(dataValue, "user-services");
        button.button("reset");
        if (result.data.errno) {
          Swal.fire(result.data.message, "", "error");
        } else {
          Swal.fire("Update or add success", "", "success").then(result => {
            this.table.ajax.reload(null, false);
            this.modalEl.modal("hide");
          });
        }
      }
      else if(e.detail.delete){
        const result = await Services.deleteApi({id:e.detail.delete}, "user-services");
        if (typeof(result.data.errno) !== "undefined") {
          Swal.fire(result.data.message, "", "error");
        } else {
          Swal.fire("Delete success", "", "success").then(result => {
            this.table.ajax.reload(null, false);
            this.modalEl.modal("hide");
          });
        }
      }

      return false;
    }
  },
  async mounted() {
    document.addEventListener('click', this.handleSubmit);
    var dataClients = await this.loadDataClients();
    var dataServices = await this.loadDataServices();
    this.table = $("#example1").DataTable({
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
        url: `${API.HOST}/user-services`,
        type: "GET",
        data: function(param) {
          const mappingColumnName = [
            "name",
            "dateRegister",
            "dateExpires",
            "dateRemind",
            "description",
            "services",
            "clients",
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
        { data: "name" },
        { data: "dateRegister" },
        { data: "dateExpires" },
        { data: "dateRemind"},
        { data: "description" },
        { data: "services" },
        { data: "clients" },
        { data: "status" }
      ],
      columnDefs: [
          {
            targets: 1,
            data: "dateRegister",
            render: function ( data, type, row, meta ) {
              const timeShow = moment(String(data)).format('DD/MM/YYYY');
              const timeInput = moment(String(data)).format('YYYY-MM-DD');
              const contentdateRegister = `<div class="text-center" data-time="${timeInput}">
                                        <span class="alert alert-success">${timeShow}</span>
                                       </div>`;
              return contentdateRegister;//(new Date(data)).toLocaleDateString("en-US");
            }
          },
          {
            targets: 2,
            data: "dateExpires",
            render: function ( data, type, row, meta ) {
              const timeShow = moment(String(data)).format('DD/MM/YYYY');
              const timeInput = moment(String(data)).format('YYYY/MM/DD');
              const contentdateExpires = `<div class="text-center"  data-time="${timeInput}">
                                        <span class="alert alert-success">${timeShow}</span>
                                       </div>`;
              return contentdateExpires;//(new Date(data)).toLocaleDateString("en-US");
            }
          },
          {
            targets: 3,
            data: "dateRemind",
            render: function ( data, type, row, meta ) {
              const dateExpires = moment(String(row.dateExpires)).format('X');
              const dateRegister = moment(String(row.dateRegister)).format('X');
              const dateRemind = moment(String(row.dateRemind)).format('X');
              console.log("dateExpires - dateRegister - dateRemind",dateExpires + '-'+ dateRegister + '-'+ dateRemind)
              let classShow = "alert-success";

              if(dateExpires - dataServices >= dateRemind) {
                classShow = "alert-danger";
              }
              const timeShow = moment(String(data)).format('DD/MM/YYYY');
              const timeInput = moment(String(data)).format('YYYY/MM/DD');
              const contentdateRemind = `<div class="text-center"  data-time="${timeInput}">
                                        <span class="alert ${classShow}">${timeShow}</span>
                                       </div>`;
              return contentdateRemind;//(new Date(data)).toLocaleDateString("en-US");
            }
          },
          {
            targets: 5,
            data: "services",
            render: function ( data, type, row, meta ) {
              const contentServices = `<div class="text-center" data-id="${data.id}">
                                        <a class="alert alert-success" target="_blank" href="/clients?id=${data.id}">${data.name}</a>
                                       </div>`;
              return contentServices;//(new Date(data)).toLocaleDateString("en-US");
            }
          },
          {
            targets: 6,
            data: "clients",
            render: function ( data, type, row, meta ) {
              const contentClients = `<div class="text-center" data-id="${data.id}">
                                        <a class="alert alert-success" target="_blank" href="/clients?id=${data.id}">${data.fullname}</a>
                                       </div>`;
              return contentClients;//(new Date(data)).toLocaleDateString("en-US");
            }
          },
          {
            targets: 7,
            data: "status",
            render: function ( data, type, row, meta ) {
              let classShow = '';
              let dataShow = '';
              switch(data){
                  case 1:
                    classShow = 'alert-success';
                    dataShow = 'Active';
                    break;
                  case 2:
                    classShow = 'alert-danger';
                    dataShow = 'Disable';
                    break;
              }
              const contentStatus = `<div class="text-center" data-status="${data}">
                                        <span class="alert ${classShow}">${dataShow}</span>
                                       </div>`;
              return contentStatus;//(new Date(data)).toLocaleDateString("en-US");
            }
          },
          {
            targets: 8,
            data: null,
            defaultContent:
              '<a class="btn btn-warning btn-sm btn-edit-item">Edit</a> <a class="btn btn-danger btn-sm btn-delete">Delete</a>'
          }
        ]
    });
    this.modalEl = $("#model-edit-or-add-data");
    $("body").on("click", ".btn-edit-item", async function() {
      this.modalEl = $("#model-edit-or-add-data");
      this.modalEl.modal("show");
      const form = $("#add-or-update-form");
      const parentsTr = $(this).parents("tr");
      const serviceId = parentsTr.attr("id");
      const name = parentsTr.find("td").eq(0).text(),
            dateRegister = parentsTr.find("td").eq(1).find("div").attr('data-time'),
            dateExpires = parentsTr.find("td").eq(2).find("div").attr('data-time'),
            dateRemind = parentsTr.find("td").eq(3).find("div").attr('data-time'),
            description = parentsTr.find("td").eq(4).text(),
            services = parentsTr.find("td").eq(5).find("div").attr('data-id'),
            clients = parentsTr.find("td").eq(6).find("div").attr('data-id'),
            status = parentsTr.find("td").eq(7).find("div").attr('data-status');
      //Date picker
      this.modalEl.find("input[name=dateExpires]").datepicker({ autoclose: true,format: 'yyyy-mm-dd'}).on('changeDate', function(e) {
            // Revalidate the date field
            $("#add-or-update-form").bootstrapValidator('revalidateField', 'dateExpires');
      });
      this.modalEl.find("input[name=dateRegister]").datepicker({ autoclose: true,format: 'yyyy-mm-dd'}).on('changeDate', function(e) {
            // Revalidate the date field
            $("#add-or-update-form").bootstrapValidator('revalidateField', 'dateRegister');
      });
      this.modalEl.find("input[name=dateRemind]").datepicker({ autoclose: true,format: 'yyyy-mm-dd'}).on('changeDate', function(e) {
            // Revalidate the date field
            $("#add-or-update-form").bootstrapValidator('revalidateField', 'dateRemind');
      });
      //Initialize Select2 Elements
      this.modalEl.find(".select2").select2({ width: "100%"});
      this.modalEl.find("select[name=services]").html(dataServices);
      this.modalEl.find("select[name=clients]").html(dataClients);
      this.modalEl.on("shown.bs.modal", function(e) {
        $("#add-or-update-form").bootstrapValidator("resetForm", true);
        form.find("input[name=name]").val(name);
        form.find("input[name=dateRegister]").datepicker('setDate', new Date(dateRegister));
        form.find("input[name=dateExpires]").datepicker('setDate', new Date(dateExpires));
        form.find("input[name=dateRemind]").datepicker('setDate', new Date(dateRemind));
        form.find("select[name=services]").val(services).trigger("change");
        form.find("select[name=clients]").val(clients).trigger("change");
        form.find("textarea[name=description]").val(description);
        form.find("select[name=status]").val(status).trigger("change");
        form.find("input[name=id]").val(serviceId);
        
      });
      this.modalEl.on("hidden.bs.modal", function(e) {
          $("#add-or-update-form").data('bootstrapValidator').resetForm();
      });
      $("#add-or-update-form").bootstrapValidator({
         live: 'enabled',
        fields: {
          name: {
            validators: {
              notEmpty: {
                message: "please input name"
              }
            }
          },
          services: {
            validators: {
              notEmpty: {
                message: "please input services"
              }
            }
          },
          clients: {
            validators: {
              notEmpty: {
                message: "please input clients"
              }
            }
          },
          description: {
            validators: {
              notEmpty: {
                message: "please input description"
              }
            }
          },
          dateRegister: {
            validators: {
              notEmpty: {
                message: "please input dateRegister"
              },
              date: {
                format: 'YYYY-MM-DD'
              }
            }
          },
          dateExpires: {
            validators: {
              notEmpty: {
                message: "please input dateExpires"
              },
              date: {
                format: 'YYYY-MM-DD'
              }
            }
          },
          dateRemind: {
            validators: {
              notEmpty: {
                message: "please input dateRimind"
              },
              date: {
                format: 'YYYY-MM-DD'
              }
            }
          },
          status: {
            validators: {
              notEmpty: {
                message: "please input status"
              }
            }
          }
        },

        onSuccess:async function(e, data) {
          e.preventDefault();
          var event = new CustomEvent("click",{
            detail: {
              error:false
            }
          });
          document.dispatchEvent(event); 
          return false;
        }
      })

    });
    $("body").on("click", ".btn-add-item", async function() {
      this.modalEl = $("#model-edit-or-add-data");
      this.modalEl.find("input[name=id]").val("");
      const form = $("#add-or-update-form");
      form[0].reset();
      this.modalEl.modal("show");
      this.modalEl.find("select[name=services]").html(dataServices);
      this.modalEl.find("select[name=clients]").html(dataClients);
      //Date picker
      this.modalEl.find("input[name=dateExpires]").datepicker({ autoclose: true,format: 'yyyy-mm-dd'}).on('changeDate', function(e) {
            // Revalidate the date field
            $("#add-or-update-form").bootstrapValidator('revalidateField', 'dateExpires');
      });
      this.modalEl.find("input[name=dateRegister]").datepicker({ autoclose: true,format: 'yyyy-mm-dd'}).on('changeDate', function(e) {
            // Revalidate the date field
            $("#add-or-update-form").bootstrapValidator('revalidateField', 'dateRegister');
      });

      this.modalEl.find("input[name=dateRemind]").datepicker({ autoclose: true,format: 'yyyy-mm-dd'}).on('changeDate', function(e) {
            // Revalidate the date field
            $("#add-or-update-form").bootstrapValidator('revalidateField', 'dateRemind');
      });
      //Initialize Select2 Elements
      this.modalEl.find(".select2").select2({ width: "100%"});

      $("#add-or-update-form").bootstrapValidator({
         live: 'enabled',
        fields: {
          name: {
            validators: {
              notEmpty: {
                message: "please input name"
              }
            }
          },
          services: {
            validators: {
              notEmpty: {
                message: "please input services"
              }
            }
          },
          clients: {
            validators: {
              notEmpty: {
                message: "please input clients"
              }
            }
          },
          description: {
            validators: {
              notEmpty: {
                message: "please input description"
              }
            }
          },
          dateRegister: {
            validators: {
              notEmpty: {
                message: "please input dateRegister"
              },
              date: {
                format: 'YYYY-MM-DD'
              }
            }
          },
          dateExpires: {
            validators: {
              notEmpty: {
                message: "please input dateExpires"
              },
              date: {
                format: 'YYYY-MM-DD'
              }
            }
          },
          dateRemind: {
            validators: {
              notEmpty: {
                message: "please input dateRemind"
              },
              date: {
                format: 'YYYY-MM-DD'
              }
            }
          },
          status: {
            validators: {
              notEmpty: {
                message: "please input status"
              }
            }
          }
        },

        onSuccess:async function(e, data) {
          e.preventDefault();
          var event = new CustomEvent("click",{
            detail: {
              error:false
            }
          });
          document.dispatchEvent(event); 
          return false;
        }
      });
      this.modalEl.on("shown.bs.modal", function(e) {
        $("#add-or-update-form").bootstrapValidator("resetForm", true);
        form.find("input[name=id]").val('');
      });
      this.modalEl.on("hidden.bs.modal", function(e) {
          $("#add-or-update-form").data('bootstrapValidator').resetForm();
      });
      
    });
    $("body").on("click", ".btn-delete", async function() {
      const parentsTr = $(this).parents("tr");
      const serviceId = parentsTr.attr("id");
      var event = new CustomEvent("click", {
            detail: {
              delete: serviceId
            }
          });
      document.dispatchEvent(event);
      return false;
    })
  }
};
</script>
<style >
.ml-20 {
  margin-left: 20px;
}
.alert { 
  padding: 5px 10px ;
  margin: 0 ;
}
.text-center {
  text-align: center;
}
</style>
