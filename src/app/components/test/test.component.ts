import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

  }

  checkUpdate() {
    /**
     * 有变更检测则抛出，在开发模式中使用，以验证运行更改检测不会引入其他变化
     */
    this.cd.checkNoChanges();
    /**
     * 将此组件与变更检测树分离，不会检测次组件，直到他被重新连接到变更检测树
     */
    this.cd.detach();
    /**
     * 检查当前组件和子组件
     */
    this.cd.detectChanges();
    /**
     * OnPush 变更检测策略的组件可以再次检测
     */
    this.cd.markForCheck();
    /**
     * 将组件连接到变更检测树
     */
    this.cd.reattach();
  }

}
