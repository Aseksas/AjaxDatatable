<?php
namespace ajpf\AjaxDatatableBundle\Service;

use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

class DatatableResponse {

    public function onKernelResponse(FilterResponseEvent $event)
    {
        $request = $event->getRequest();

        if($request->request->has("ajpf-datatable")){

        }


    }

}