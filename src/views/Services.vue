<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Services
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
        <li class="active">Services</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Services</h3>
              <button class="btn btn-success btn-sm btn-add-item ml-20">Add New</button>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                  <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>status</th>
                    <th>Actions</th>
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
              <h4 class="modal-title">Services</h4>
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
export default {
  data: function() {
    return {
      table: "",
      modalEl: ""
    };
  },
  methods: {
    async loadData() {
      const data = await axios.get(API.HOST + "/services");
      console.log("data", data.data);
      return data;
    },
    handleSubmit: async function(e) {
      // this.$refs.form.submit()
      if (e.detail.error===false) {
        const form = $("#add-or-update-form");
        let dataValue = form.serialize();
        const button = form.find("button[type=submit]").button("loading");
        const result = await Services.createOrApi(dataValue, "services");
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
        const result = await Services.deleteApi({id:e.detail.delete}, "services");
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
  mounted() {
    document.addEventListener('click', this.handleSubmit);
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
        url: `${API.HOST}/services`,
        type: "GET",
        data: function(param) {
          const mappingColumnName = ["name", "description", "status"];
          param.orderName = mappingColumnName[param.order[0].column];
          param.orderStatus = param.order[0].dir;
        },
        dataSrc: function(json) {
          return json.data;
        }
      },
      rowId: "id",
      columns: [{ data: "name" }, { data: "description" }, { data: "status" }],
      columnDefs: [
         {
            targets: 2,
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
          targets: 3,
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
      const parentsTr = $(this).parents("tr");
      const serviceId = parentsTr.attr("id");
      const form = $("#add-or-update-form");
      //Initialize Select2 Elements
      form.find(".select2").select2({ width: "100%" });
      $("#add-or-update-form").bootstrapValidator({
        live: "enabled",
        fields: {
          name: {
            validators: {
              notEmpty: {
                message: "please input name"
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
          status: {
            validators: {
              notEmpty: {
                message: "please input status"
              }
            }
          }
        },

        onSuccess: async function(e, data) {
          e.preventDefault();
          var event = new CustomEvent("click", {
            detail: {
              error: false
            }
          });
          document.dispatchEvent(event);
          return false;
        }
      });
      this.modalEl.on("shown.bs.modal", function(e) {
        form[0].reset();
        $("#add-or-update-form").data('bootstrapValidator').resetForm();
        const name = parentsTr.find("td").eq(0).text(),
            description = parentsTr.find("td").eq(1).text(),
            status = parentsTr.find("td").eq(2).find("div").attr('data-status');
        form.find("input[name=name]").val(name);
        form.find("textarea[name=description]").val(description);
        form.find("select[name=status]").val(status).trigger("change");
        form.find("input[name=id]").val(serviceId);
      })
    });
    $("body").on("click", ".btn-add-item", async function() {
      this.modalEl = $("#model-edit-or-add-data");
      
      const form = $("#add-or-update-form");
      //Initialize Select2 Elements
      form.find(".select2").select2({ width: "100%" });
      
      this.modalEl.modal("show");
      $("#add-or-update-form").bootstrapValidator({
        live: "enabled",
        fields: {
          name: {
            validators: {
              notEmpty: {
                message: "please input name"
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
          status: {
            validators: {
              notEmpty: {
                message: "please input status"
              }
            }
          }
        },

        onSuccess: async function(e, data) {
          e.preventDefault();
          var event = new CustomEvent("click", {
            detail: {
              error: false
            }
          });
          document.dispatchEvent(event);
          return false;
        }
      });
      this.modalEl.on("shown.bs.modal", function(e) {
        // alert(34234)
        form[0].reset();
        form.find("input[name=id]").val('');
        // this.modalEl.find("input[name=id]").val("");
        $("#add-or-update-form").data('bootstrapValidator').resetForm();
      })
       
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
<style scoped>
.ml-20 {
  margin-left: 20px;
}
</style>


