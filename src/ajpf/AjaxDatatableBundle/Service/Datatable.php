<?php
namespace ajpf\AjaxDatatableBundle\Service;

use Doctrine\ORM\EntityManager;

class Datatable {

    private $name = "grid_";
    private $fieldCollection = [];
    private $overwriteResultCollection = [];
    private $overwriteFilterCollection = [];
    /**
     * Datatable constructor.
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function create($entity)
    {
        $this->name .= strtolower(str_replace("\\","_", $entity));
        $this->fieldCollection = $this->em->getClassMetadata($entity)->getFieldNames();

        $this->removeField('id');

        return $this;
    }

    public function addField($field)
    {
        $this->fieldCollection[] = $field;
        return $this;
    }

    public function removeField($field)
    {
        unset($this->fieldCollection[array_search($field, $this->fieldCollection)]);
        return $this;
    }

    public function overwriteFieldResult($field, $overwriteFunction)
    {
        $this->overwriteResultCollection[$field] = $overwriteFunction;
        return $this;
    }

    public function rewriteFieldFilter($field, $overwriteFilterFunction)
    {
        $this->overwriteFilterCollection[$field] = $overwriteFilterFunction;
        return $this;
    }

    public function build() {
    }
}