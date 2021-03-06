import {
  Component,
  ViewContainerRef,
  Injector,
  ViewChild,
  Optional,
  ChangeDetectorRef,
  Inject,
  ComponentRef
} from '@angular/core';
import { Feature2Component } from "./feature2/feature2.component";
import { Feature1Component } from "./feature1/feature1.component";
import {Feature3Component} from "./feature3/feature3.component";
import {DynamicComponentsResolver} from "../dynamic-component-resolver.service";
import { FormBuilder, FormControl } from '@angular/forms';
import {IFeature} from "../IFeature";
import { EmployeeService } from './services/employee.service';
import { Store } from '@ngrx/store';
import { LoadEmployeeAction, SaveEmployeeAction } from './store/employee.action';
import { selectEmployee } from './store/employee.selector';

@Component({
  selector: 'app-app1',
  templateUrl: './app1.component.html',
  styleUrls: ['./app1.component.scss']
})
export class App1Component {

  dynamicComponents = [Feature1Component, Feature2Component, Feature3Component];
  componentsRefs: ComponentRef<any>[] = [];

  constructor(
      private injector: Injector,
      private fb: FormBuilder,
      private changeDetectorRef: ChangeDetectorRef,
      @Optional() @Inject('DEPENDENCY_RESOLVER') private dynamicResolver: DynamicComponentsResolver,
      private employee: EmployeeService,
      private store: Store,
  ) {
  }

  public form = this.fb.group({});
  public bus = this.fb.group({
    submitDisabled: new FormControl(false),
  });
  public model: any = {
    feature1Name: 'Feature 1',
    feature2Name: 'Feature 2',
    feature3Name: 'Feature 3',
  };

  @ViewChild('container', {read: ViewContainerRef} ) container: ViewContainerRef | undefined;

  public async ngOnInit() {
    this.store.dispatch(new LoadEmployeeAction);

    this.dynamicComponents =
      await this.dynamicResolver.getDynamicComponents(this.dynamicComponents);
    this.initFeatures();
    this.changeDetectorRef.detectChanges();

/*    this.model = await this.employee.getEmployee();*/
    this.store.select(selectEmployee).subscribe((data) => {
      if(data) {
        this.refreshModel(data);
      }
    });
  }

  private refreshModel(model: any){
    this.componentsRefs.forEach( (ref)=> {
      let previous = ref.instance.model;
      ref.instance.model = model;
      if(!ref.instance?.ngOnChanges) {
        return;
      }
      ref.instance?.ngOnChanges({model: {
          previousValue: previous,
          currentValue: ref.instance.model,
        }});
    })
  }

  private initFeatures() {
    this.container?.clear();
    this.dynamicComponents.forEach((component)=>{
      this.createComponent(component);
    })
  }

  private createComponent(component: any) {
    Injector.create({
      providers: [],
      parent: this.injector,
    });

    const componentRef = this?.container?.createComponent<IFeature>(component, {
      injector: this.injector
    });

    if(componentRef) {
      componentRef.instance.form = this.form;
      componentRef.instance.bus = this.bus;
      componentRef.instance.model = this.model;
      componentRef.instance.changed.subscribe(this.featureChanged.bind(this));
      this.componentsRefs.push(componentRef);
    }
  }

  private featureChanged(value: any) {
    this.refreshModel(value);
  }

  public submit() {
    if(this.form.invalid) {
      console.log('FORM IS INVALID');
      return;
    }
    this.store.dispatch(new SaveEmployeeAction(this.form.value));
  }
}
