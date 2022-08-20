import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../servers/http.service';
import { Func } from '../../provides/func.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [HttpService]
})
export class TableComponent implements OnInit {
  serachForm: FormGroup
  checked = false;
  loading = true;
  pageSize = 10;
  pageNo = 1;
  total = 1;
  indeterminate = false;
  tableList: any[] = [];
  listOfCurrentPageData: any[] = [];
  setOfCheckedId = new Set<number>();
  publishDate_begin: string = "";
  publishDate_end: string = "";
  isVisible: boolean = false;
  dataDetail: any = {};
  constructor(
    private fb: FormBuilder,
    private func: Func,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.serachForm = this.fb.group({
      title: [null],
      content: [null],
    })
    this.getList();
  }

  //获取列表
  getList() {
    let params = {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      publishDate_begin: this.publishDate_begin,
      publishDate_end: this.publishDate_end,
      ...this.serachForm.value
    }
    
    this.loading = true;
    this.httpService.get("/news/newsArticle/list", params).then(res => {
      if(res.code === 200) {
        this.tableList = res.result.records;
        this.total = res.result.total;
        this.loading = false;
      }
    })
  }

  //搜索
  serach() {
    this.getList();
  }

  //重置
  repeat() {
    this.publishDate_begin = "";
    this.publishDate_end = "";
    this.serachForm.reset();
    this.getList();
  }

  //当前页数据改变
  onCurrentPageDataChange(listOfCurrentPageData: any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  //更新选中的数据
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  //页码改变
  onPageNoChange(): void {
    this.getList();
  }

  //页数改变
  onPageSizeChange(): void {
    this.pageNo = 1;
    this.getList();
  }

  //刷新状态
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  //全部选择
  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  //单项选择
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    console.log('onOk', result);
    this.publishDate_begin = this.func.dateFormat(result[0]);
    this.publishDate_end = this.func.dateFormat(result[0]);
  }

  //编辑
  etit() {

  }

  //详情
  detail(data: any) {
    this.dataDetail = data;
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

}
