<?php
namespace ajpf\AjaxDatatableBundle;

class Datatable {

    private $name = "grid_";
    private $orderBy = [[1,"asc"]];

    private $dataCollection = [];
    private $filterCollection = [];

    public function __construct($name , $p)
    {
        $this->name .= $name;
    }

    public function addOrder($column = 1, $type = "asc")
    {
        array_push($this->orderBy, [$column, $type]);
        return $this;
    }

    public function clearOrder()
    {
        $this->orderBy = [];
        return $this->addOrder();
    }

    public function setData($field, $callback)
    {

        return $this;
    }

    public function setFilter($field, $callback) {

        return $this;
    }

}